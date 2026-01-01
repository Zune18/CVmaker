import React, {useEffect, useMemo, useRef} from 'react';
import styles from './load-resume-data.module.scss';
import {useDataModel} from '../../../hooks/useDataModel';
import {apiEndPoints} from '../../../../backend/services/constants';
import {ASetDocConfig, ASetDocSettings, ASetDocumentInfo} from '../../../../backend/redux/reducers/document-reducer';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	AResetDocumentData,
	ASetPageWiseData,
	ASetPersonalInformation
} from '../../../../backend/redux/reducers/document-data-reducer';
import {mydocumentsPath} from '../../Global/global-paths/global-paths';
import {AClearEditorAPIStatus} from "../../../../backend/redux/reducers/editor-api-reducer";

interface I_Props {
	silentSync: number;
}

function LoadResumeData({ silentSync }: I_Props) {
	const params = useParams();
	const router = useNavigate();

	// redux hooks
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ASetDocSettings({}));
		dispatch(ASetDocConfig({}));
		dispatch(ASetDocumentInfo({}));
		dispatch(ASetPersonalInformation({}));
		dispatch(AResetDocumentData());
		dispatch(AClearEditorAPIStatus())
	}, []);

	useEffect(() => {
		if (params.documentId) {
			loadAllDocumentInformation();
		}
	}, [params.documentId]);

	useEffect(() => {
		if (params.documentId && silentSync > 0) {
			isSilentLoading.current = true;
			loadAllDocumentInformation();
		}
	}, [silentSync]);

	function loadAllDocumentInformation() {
		documentDetailsAPI.controllers.setRequestPayload({
			documentId: params.documentId
		});
		documentPagesWithDataAPI.controllers.setRequestPayload({
			documentId: params.documentId
		});
		documentConfigAPI.controllers.setRequestPayload({
			documentId: params.documentId
		});
		documentPagesAPI.controllers.setRequestPayload({
			documentId: params.documentId
		});
	}

	const documentDetailsAPI = useDataModel({
		apiEndpoint: apiEndPoints.get_document_details,
		onApiSuccess: (res) => {
			// dispatch(ASetDocSettings(DOC_SETTINGS));
			// dispatch(ASetDocConfig(DUMMY_CONFIG));
			dispatch(ASetDocumentInfo(res.data.document));
		},
		onApiError: (errRes) => {
			console.log({ errRes });
			if (errRes.statusCode === 400) {
				router(mydocumentsPath);
			}
		}
	});

	const documentConfigAPI = useDataModel({
		apiEndpoint: apiEndPoints.get_document_config,
		onApiSuccess: (res) => {
			dispatch(ASetDocSettings(res.data.docConfig));
		},
		onApiError: (errRes) => {
		}
	});

	const documentPagesAPI = useDataModel({
		apiEndpoint: apiEndPoints.get_document_pages,
		onApiSuccess: (res) => {
			const newConfig: any = {};
			res.data.pageConfig.map((item: any, index: number) => {
				newConfig[`page_${item.pageNo}`] = item;
				return null;
			});
			dispatch(ASetDocConfig(newConfig));
		},
		onApiError: (errRes) => {
		}
	});

	const documentPagesWithDataAPI = useDataModel({
		apiEndpoint: apiEndPoints.get_document_data,
		onApiSuccess: (res) => {
			dispatch(ASetPersonalInformation(res.data.personalInfo));
			const newPageWiseData: any = {};
			res.data.pageConfig.map((item: any, index: number) => {
				newPageWiseData[`page_${item.pageNo}`] = item;
				return null;
			});
			dispatch(ASetPageWiseData(newPageWiseData));
		},
		onApiError: (errRes) => {
		}
	});

	const isSilentLoading = useRef(false);
	const IsLoadingData = useMemo(() =>
		documentPagesAPI.isLoading || documentConfigAPI.isLoading || documentPagesWithDataAPI.isLoading || documentDetailsAPI.isLoading,
	[documentDetailsAPI.isLoading, documentPagesAPI.isLoading, documentPagesWithDataAPI.isLoading, documentConfigAPI.isLoading]);

	useEffect(() => {
		if (!IsLoadingData) {
			isSilentLoading.current = false;
		}
	}, [IsLoadingData]);

	return (
		<>
			{IsLoadingData && !isSilentLoading.current ? <>
				<div className={styles.container}>
					<div className={styles.apiList}>
						<div className={styles.title}>
							Loading Details...
						</div>
						<header>
							{documentDetailsAPI.isLoading ?
								<CircularProgress color='inherit' size={20} /> :
								<CheckCircleIcon color={'success'} fontSize={'medium'} />
							}
							<header>Resume Details</header>
						</header>
						<header>
							{documentPagesAPI.isLoading ?
								<CircularProgress color='inherit' size={20} /> :
								<CheckCircleIcon color={'success'} fontSize={'medium'} />
							}
							<header>Resume Pages</header>
						</header>
						<header>
							{documentConfigAPI.isLoading ?
								<CircularProgress color='inherit' size={20} /> :
								<CheckCircleIcon color={'success'} fontSize={'medium'} />
							}
							<header>Resume Config</header>
						</header>
						<header>
							{documentPagesWithDataAPI.isLoading ?
								<CircularProgress color='inherit' size={20} /> :
								<CheckCircleIcon color={'success'} fontSize={'medium'} />
							}
							<header>Resume Data</header>
						</header>
					</div>
				</div>
			</> : null}
		</>
	);
}

export default LoadResumeData;