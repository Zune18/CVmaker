import axios, { AxiosResponse, AxiosError } from 'axios';
import { getEnv } from '../environment/environment';
import { apiEndPoints, apiVersions } from './constants';
import { EncryptedStorage, EncryptedStorageKeys } from './encrypted-storage/encrypted-storage';

export interface IFetchConfig {
	apiEndpoint: string;

	isFullUrl?: boolean;
	apiVersion?: apiVersions;
	method?: 'get' | 'post';
}

export enum E_FrontendAPIError {
	'AXIOS_ERROR' = 'AXIOS_ERROR',
	'CANCELLED' = 'CANCELLED',
	'UNKNOWN' = 'UNKNOWN'
}

export interface IFetchDataResponse {
	frontErrorType?: E_FrontendAPIError;
	data: any;
	statusCode: number;
	message: string;
	errors: any;
}

export class FetchRequest {
	config: IFetchConfig = { apiEndpoint: apiEndPoints.test_api, method: 'post', apiVersion: apiVersions.apiV1 };
	controller: AbortController;

	constructor(config: IFetchConfig) {
		this.config = { ...this.config, ...config };
		this.controller = new AbortController();
	}

	buildClient() {
		return axios.create({
			method: this.config.method,
			baseURL: this.buildFullUrl(),
			signal: this.controller.signal,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${EncryptedStorage.getItem(EncryptedStorageKeys.sessionId)}`
			}
		});
	}

	buildFullUrl() {
		if (this.config.isFullUrl) {
			return this.config.apiEndpoint;
		}
		return `${getEnv().baseURL}${this.config.apiVersion}${this.config.apiEndpoint}`;
	}

	async fetchData(payload: any = {}): Promise<IFetchDataResponse> {
		try {
			const client = this.buildClient();
			const response = await client({ data: payload });
			return this.serializeResponse(response);
		} catch (error: AxiosError | any) {
			return this.serializeErrorResponse(error);
		}
	}

	serializeResponse(response: AxiosResponse): IFetchDataResponse {
		return {
			data: response.data?.data,
			statusCode: response.data?.statusCode,
			message: response.data?.message,
			errors: response.data?.errors
		};
	}

	serializeErrorResponse(errors: any): IFetchDataResponse {
		if (errors.code === "ERR_CANCELED") {
			return {
				data: null,
				frontErrorType: E_FrontendAPIError.CANCELLED,
				statusCode: 500,
				errors: [errors],
				message: 'Network Error'
			}
		}
		return {
			frontErrorType: E_FrontendAPIError.UNKNOWN,
			data: null,
			statusCode: 700,
			message: 'Something went wrong',
			errors: [errors]
		};
	}
}
