import { useEffect, useState } from 'react';
import { useDataModel } from './useDataModel';
import { apiEndPoints } from '../../backend/services/constants';
import watch from 'redux-watch';
import { store } from '../../backend/redux/store';
import equal from 'deep-equal';

function comparePageConfigs(oldVal: any, newVal: any): boolean {
	return equal({ ...oldVal, pageNo: null }, { ...newVal, pageNo: null })
}

interface IProps {
	pageNo: string;
}

export function usePageWiseConfigSync({ pageNo }: IProps) {
	const [isSaving, setIsSaving] = useState(false);

	// data watchers

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const watchPageConfig = watch(store.getState, `doc_config.config.${pageNo}`, comparePageConfigs);
		const unsubscribe = store.subscribe(watchPageConfig((newVal: any, oldVal: any, objectPath: any) => {
			if (oldVal?.id !== newVal?.id) {
				return;
			}
			const _payload = {...newVal}
			_payload.pageConfigId = newVal.id;
			updatePageConfig.controllers.abortRequest()
			updatePageConfig.controllers.setRequestPayload(_payload);
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo]);

	const updatePageConfig = useDataModel({
		apiEndpoint: apiEndPoints.update_page_config,
		onApiSuccess: (res) => {
			setIsSaving(false);
		},
		onApiError: (err) => {
			console.log({ err });
			setIsSaving(false);
		}
	});

	return {
		isSaving
	};
}