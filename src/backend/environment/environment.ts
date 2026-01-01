// environments
const DevEnv = {
	baseURL: 'http://localhost:8000'
};

const StagingEnv = {
	baseURL: 'https://cvm-staging-api.onrender.com'
};

const ProdEnv = {
	baseURL: 'http://localhost:8000'
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