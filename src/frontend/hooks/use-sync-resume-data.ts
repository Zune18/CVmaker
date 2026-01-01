import { useEffect, useState } from 'react';
import { useDataModel } from './useDataModel';
import { apiEndPoints } from '../../backend/services/constants';
import watch from 'redux-watch';
import { store } from '../../backend/redux/store';
import equal from 'deep-equal';
import {ASetEditorAPIStatus} from "../../backend/redux/reducers/editor-api-reducer";
import {ReduxHelpers} from "../../backend/redux/helpers/helpers";

function compareObjects(oldVal: any, newVal: any): boolean {
	return equal(oldVal, newVal)
}

export function useSyncResumeData() {
	const [isSaving, setIsSaving] = useState(false);

	// data watchers
	const watchPersonalInformation = watch(store.getState, 'doc_data.personal_information', compareObjects);
	const watchDocumentSettings = watch(store.getState, 'doc_config.settings', compareObjects);

	useEffect(() => {
		const unsubscribe = store.subscribe(watchPersonalInformation((newVal: any, oldVal: any, objectPath: any) => {
			if (oldVal.id !== newVal.id) {
				return;
			}
			const payload = { ...newVal };
			payload.personalInfoId = newVal.id;
			setIsSaving(true);
			updatePersonalInformationAPI.controllers.abortRequest()
			updatePersonalInformationAPI.controllers.setRequestPayload(payload);
		}));
		return () => {
			if (unsubscribe && typeof unsubscribe === 'function') {
				unsubscribe();
			}
		};
	}, []);

	useEffect(() => {
		const unsubscribe = store.subscribe(watchDocumentSettings((newVal: any, oldVal: any, objectPath: any) => {
			if (oldVal.id !== newVal.id) {
				return;
			}
			const _payload = { ...newVal };
			_payload.docConfigId = newVal.id;
			setIsSaving(true);
			updateDocSettingsAPI.controllers.abortRequest()
			updateDocSettingsAPI.controllers.setRequestPayload(_payload);
		}));
		return () => {
			if (unsubscribe && typeof unsubscribe === 'function') {
				unsubscribe();
			}
		};
	}, []);

	const updatePersonalInformationAPI = useDataModel({
		apiEndpoint: apiEndPoints.update_personal_information,
		syncWithRedux: true,
		reduxKeyName: 'personal_information',
		reduxAction: ASetEditorAPIStatus,
		callReduxAction: ReduxHelpers.callReduxAction,
		onApiSuccess: (res) => {
			setIsSaving(false);
		},
		onApiError: (err) => {
			console.log({ err });
			setIsSaving(false);
		}
	});

	const updateDocSettingsAPI = useDataModel({
		apiEndpoint: apiEndPoints.update_document_config,
		syncWithRedux: true,
		reduxKeyName: 'doc_settings',
		reduxAction: ASetEditorAPIStatus,
		callReduxAction: ReduxHelpers.callReduxAction,
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