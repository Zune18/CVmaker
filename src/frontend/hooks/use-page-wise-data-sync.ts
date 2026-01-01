import { useEffect, useState } from 'react';
import { useDataModel } from './useDataModel';
import { apiEndPoints } from '../../backend/services/constants';
import watch from 'redux-watch';
import { RootState, store } from '../../backend/redux/store';
import equal from 'deep-equal';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ASetEditorAPIStatus} from "../../backend/redux/reducers/editor-api-reducer";
import {ReduxHelpers} from "../../backend/redux/helpers/helpers";

function compareObjects(oldVal: any, newVal: any): boolean {
	return equal(oldVal, newVal)
}

interface IProps {
	pageNo: string;
}

export function usePageWiseDataSync({ pageNo }: IProps) {
	// router hooks
	const params = useParams();

	const pageInfo = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?? {})

	const [isSaving, setIsSaving] = useState(false);

	// data Work watchers
	const watchWorkExps = watch(store.getState, `doc_data.pagewise_data.${pageNo}.work_exps`, compareObjects);

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const unsubscribe = store.subscribe(watchWorkExps((newVal: any, oldVal: any, objectPath: any) => {
			if (!newVal || !oldVal) {
				return;
			}
			if (oldVal?.length === newVal?.length && oldVal.length === 0) {
				return;
			}
			const _payload = {
				documentId: params.documentId,
				pageConfigId: pageInfo._id,
				pageNo,
				work_exps: newVal
			}
			console.log({oldVal, newVal, _payload});
			syncWorkExpsAPI.controllers.setRequestPayload(_payload)
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo, pageInfo]);

	const syncWorkExpsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_work_exps,
		syncWithRedux: true,
		reduxKeyName: 'work_exps_information',
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
	// data Projects watchers
	const watchProjects = watch(store.getState, `doc_data.pagewise_data.${pageNo}.projects`, compareObjects);

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const unsubscribe = store.subscribe(watchProjects((newVal: any, oldVal: any, objectPath: any) => {
			if (!newVal || !oldVal) {
				return;
			}
			if (oldVal?.length === newVal?.length && oldVal.length === 0) {
				return;
			}
			const _payload = {
				documentId: params.documentId,
				pageConfigId: pageInfo._id,
				pageNo,
				projects: newVal
			}
			console.log({oldVal, newVal, _payload});
			syncProjectsAPI.controllers.setRequestPayload(_payload)
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo, pageInfo]);

	const syncProjectsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_projects,
		syncWithRedux: true,
		reduxKeyName: 'projects_information',
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

	// data Education watchers
	const watchEducation = watch(store.getState, `doc_data.pagewise_data.${pageNo}.educations`, compareObjects);

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const unsubscribe = store.subscribe(watchEducation((newVal: any, oldVal: any, objectPath: any) => {
			if (!newVal || !oldVal) {
				return;
			}
			if (oldVal?.length === newVal?.length && oldVal.length === 0) {
				return;
			}
			const _payload = {
				documentId: params.documentId,
				pageConfigId: pageInfo._id,
				pageNo,
				educations: newVal
			}
			console.log({oldVal, newVal, _payload});
			syncEducationsAPI.controllers.setRequestPayload(_payload)
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo, pageInfo]);

	const syncEducationsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_educations,
		syncWithRedux: true,
		reduxKeyName: 'educations_information',
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
	// data Achievements watchers
	const watchAchievements = watch(store.getState, `doc_data.pagewise_data.${pageNo}.achievements`, compareObjects);

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const unsubscribe = store.subscribe(watchAchievements((newVal: any, oldVal: any, objectPath: any) => {
			if (!newVal || !oldVal) {
				return;
			}
			if (oldVal?.length === newVal?.length && oldVal.length === 0) {
				return;
			}
			const _payload = {
				documentId: params.documentId,
				pageConfigId: pageInfo._id,
				pageNo,
				achievements: newVal
			}
			console.log({oldVal, newVal, _payload});
			syncAchievementsAPI.controllers.setRequestPayload(_payload)
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo, pageInfo]);

	const syncAchievementsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_achievements,
		syncWithRedux: true,
		reduxKeyName: 'projects_information',
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
	// data Skills watchers
	const watchSkills = watch(store.getState, `doc_data.pagewise_data.${pageNo}.skills`, compareObjects);

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const unsubscribe = store.subscribe(watchSkills((newVal: any, oldVal: any, objectPath: any) => {
			if (!newVal || !oldVal) {
				return;
			}
			if (oldVal?.length === newVal?.length && oldVal.length === 0) {
				return;
			}
			const _payload = {
				documentId: params.documentId,
				pageConfigId: pageInfo._id,
				pageNo,
				skills: newVal
			}
			console.log({oldVal, newVal, _payload});
			syncSkillsAPI.controllers.setRequestPayload(_payload)
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo, pageInfo]);

	const syncSkillsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_skills,
		syncWithRedux: true,
		reduxKeyName: 'skills_information',
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
	// data Interests watchers
	const watchInterests = watch(store.getState, `doc_data.pagewise_data.${pageNo}.interests`, compareObjects);

	useEffect(() => {
		if (!pageNo) {
			return;
		}
		const unsubscribe = store.subscribe(watchInterests((newVal: any, oldVal: any, objectPath: any) => {
			if (!newVal || !oldVal) {
				return;
			}
			if (oldVal?.length === newVal?.length && oldVal.length === 0) {
				return;
			}
			const _payload = {
				documentId: params.documentId,
				pageConfigId: pageInfo._id,
				pageNo,
				interests: newVal
			}
			console.log({oldVal, newVal, _payload});
			syncInterestsAPI.controllers.setRequestPayload(_payload)
		}));
		return () => {
			unsubscribe();
		};
	}, [pageNo, pageInfo]);

	const syncInterestsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_interests,
		syncWithRedux: true,
		reduxKeyName: 'interests_information',
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