// environments
const DevEnv = {
	baseURL: 'https://cvmakerbackend-gaxv.onrender.com'
};

// OLD - https://cvm-staging-api.onrender.com

const StagingEnv = {
	baseURL: 'https://cvmakerbackend-gaxv.onrender.com'
};

// const ProdEnv = {
// 	baseURL: 'http://localhost:8000'
// };

const ProdEnv = {
	baseURL: 'https://cvmakerbackend-gaxv.onrender.com'
};

// if false api -> localhost
// if true api -> staging env (https://cvm-staging-api.onrender.com)
const isStagingTemp = true;

function getEnv(): any {
	let Env = { ...DevEnv };
	if (window && window.location?.href?.includes('https://cvm-app')) {
		Env = { ...StagingEnv };
	}

	if (window && window.location?.href?.includes('https://app-cvmaker')) {
		Env = { ...StagingEnv };
	}

	if (window && window.location?.href?.includes('http://localhost') && isStagingTemp) {
		Env = { ...StagingEnv };
	}

	if (window && window.location?.href?.includes('client side prod domain')) {
		Env = { ...ProdEnv };
	}
	return {
		...Env
	};
}

export { getEnv };