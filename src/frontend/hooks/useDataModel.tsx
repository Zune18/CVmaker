import React, {useEffect, useRef, useState} from 'react';
import {E_FrontendAPIError, FetchRequest, IFetchConfig, IFetchDataResponse} from '../../backend/services/fetch-data';
import {NetworkErrorToast} from "../app-toast-notification/toasts";
import {v4 as uuidv4} from 'uuid'

export interface IReqParams extends IFetchConfig {
	automatic?: boolean;
	payload?: any;
	syncWithRedux?: boolean;
	reduxKeyName?: string;
	reduxAction?: any;
	callReduxAction?: any;
	beforeApiCall?: (data: any) => void;
	onApiSuccess?: (data: IFetchDataResponse) => void;
	onApiError?: (data: IFetchDataResponse) => void;
	then?: (data: any) => void;
	catch?: (error: any) => void;
	onCancel?: (error: any) => void;
}

export interface IReqReturn {
	getRequestId: () => string,
	response: IFetchDataResponse | null;
	isLoading: boolean;
	controllers: {
		refreshData: () => void;
		abortRequest: () => void;
		setRequestPayload: (payload: any, refresh?: boolean) => void;
		getCurrentPayload: () => any;
	};
}

export function useDataModel(config: IReqParams): IReqReturn {
	const requestId = useRef<string>(uuidv4())

	const {payload} = config;
	// request object
	const req = useRef<FetchRequest>();

	// payload of request
	const body = useRef<any>({});

	// data from api request
	const [response, setResponse] = useState<IFetchDataResponse | null>(null);

	// request status flags
	const [isLoading, setIsLoading] = useState(false);

	// first run
	const [firstRun, setFirstRun] = useState(true)

	useEffect(() => {
		if (config) {
			createNewRequest();
			if (config?.automatic) {
				void getData().then();
			}
		}
	}, []);

	useEffect(() => {
		if (payload) {
			setRequestPayload(payload, true);
		}
	}, [payload]);

	useEffect(() => {
		if (!response) {
			return;
		}
		if (response.frontErrorType) {
			if (response.frontErrorType === E_FrontendAPIError.CANCELLED) {
				return;
			}

			NetworkErrorToast();
			config.catch && config.catch(response.errors[0]);
		} else {
			if (response.statusCode.toString().startsWith('2')) {
				config.onApiSuccess && config.onApiSuccess(response);
			} else {
				config.onApiError && config.onApiError(response);
			}
			config.then && config.then(response);
		}
	}, [response]);

	useEffect(() => {
		if (firstRun) {
			return
		}
		if (config.syncWithRedux && config.reduxAction && config.reduxKeyName && config.callReduxAction) {
			config.callReduxAction(config.reduxAction, {
				api_name: config.reduxKeyName,
				state: {
					isLoading
				}
			})
		}
	}, [isLoading])

	useEffect(() => {
		if (firstRun) {
			setFirstRun(false)
		}
	}, [])

	function generateNewRequestId(): void {
		requestId.current = uuidv4();
	}

	function getRequestId(): string {
		return requestId.current;
	}

	function createNewRequest() {
		req.current = new FetchRequest(config);
	}

	async function getData() {
		if ((req?.current) == null) {
			return;
		}
		setIsLoading(true);
		config.beforeApiCall && config.beforeApiCall(requestId.current)
		generateNewRequestId()
		const res: IFetchDataResponse = await req.current.fetchData(body.current);
		setIsLoading(false);
		setResponse(res);
	}

	function getCurrentPayload() {
		return body.current;
	}

	function refreshData(notAbortPrev: boolean = false) {
		if (!notAbortPrev) {
			abortRequest();
		}
		createNewRequest();
		void getData().then();
	}

	function setRequestPayload(data: any, refresh: boolean = true, notAbortPrev: boolean = false) {
		body.current = data;
		if (refresh) {
			refreshData(notAbortPrev);
		}
	}

	function abortRequest() {
		if (!req || (req.current == null)) {
			return;
		}
		setIsLoading(false);
		req.current.controller?.abort();
		config.onCancel && config.onCancel(getRequestId())
	}

	return {
		getRequestId: getRequestId,
		response,
		isLoading,
		controllers: {
			refreshData,
			abortRequest,
			setRequestPayload,
			getCurrentPayload
		}
	};

}