FROM node:18-alpine as build

ENV NODE_ENV production

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app
COPY ./preinstall-script.js /app

RUN npm ci --include=dev

COPY . .

RUN npm run build

FROM node:18-alpine as PRODUCTION

WORKDIR /app
RUN mkdir build
COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]