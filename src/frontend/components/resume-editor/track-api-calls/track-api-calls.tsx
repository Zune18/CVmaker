import React, { useState, useEffect, useRef } from 'react';
import styles from './track-api-calls.module.scss'
import watch from 'redux-watch';
import equal from 'deep-equal';
import {store} from "../../../../backend/redux/store";

function compareObjects(oldVal: any, newVal: any): boolean {
	return equal(oldVal, newVal)
}

const HELP_PROMPT_TIME = 5*60*1000

function TrackApiCalls(): null {
	// overall loading
	const [isLoading, setIsLoading] = useState(false)
	// data watchers
	const watchPersonalInformation = watch(store.getState, 'editor_api_status', compareObjects);

	const helpTimeoutId = useRef<any>(null)

	useEffect(() => {
		// setHelpTimeOut()
		const unsubscribe = store.subscribe(watchPersonalInformation((newVal: any, oldVal: any, objectPath: any) => {
			// setHelpTimeOut()
			checkIsLoading(newVal)
		}));
		return () => {
			if (unsubscribe && typeof unsubscribe === 'function') {
				unsubscribe();
			}
			// clearHelpTimeOut()
		};
	}, []);

	function checkIsLoading(state: any) {
		const keys = Object.keys(state) ?? []
		const tempLoading = keys.some((key, index) => state[key].isLoading)
		setIsLoading(tempLoading);
	}

	function setHelpTimeOut() {
		clearHelpTimeOut()
		helpTimeoutId.current = setTimeout(() => {
			console.log("Do you need help?")
		}, HELP_PROMPT_TIME)
	}

	function clearHelpTimeOut() {
		if (helpTimeoutId.current) {
			clearTimeout(helpTimeoutId.current)
		}
	}

	// return (
	// 	<div className={styles.container}>
	// 		{isLoading ? "Loading" : 'Track'}
	// 	</div>
	// );

	return null;
}

export default TrackApiCalls;