/* eslint-disable */

const fs = require('fs')

const isCI = (process.env.hasOwnProperty("npm_command") && process.env.npm_command === 'ci') ||
    (process.env.hasOwnProperty("npm_config_refer") && process.env.npm_config_refer === 'ci');

if (fs.existsSync("package-lock.json") && !isCI) {
    console.log("Please use npm ci");
    process.exit(1)
}
