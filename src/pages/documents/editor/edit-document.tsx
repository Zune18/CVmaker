import React, { useEffect, useId, useState } from 'react';
import styles from './edit-document.module.scss';
import BasePage from '../../../frontend/components/Global/BasePage/base-page';
import Layout from '../../../frontend/components/resume/layouts/Layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../backend/redux/store';
import Toolbar from '../../../frontend/components/resume-editor/toolbar/toolbar';
import LoadResumeData from '../../../frontend/components/resume-editor/load-resume-data/load-resume-data';
import AdjustPanelWidth from '../../../frontend/components/resume-editor/adjust-panel-width/adjust-panel-width';
import { useSyncResumeData } from '../../../frontend/hooks/use-sync-resume-data';
import { LeftSideDrawer } from '../../../frontend/components/resume-editor/left-side-drawer/left-side-drawer';
import { LayoutContextProvider } from '../../../frontend/contexts/layout-context';
import { Button, Dialog, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDataModel } from '../../../frontend/hooks/useDataModel';
import { apiEndPoints } from '../../../backend/services/constants';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useParams } from 'react-router-dom';
import { E_SecondaryPanelPosition } from '../../../backend/services/resume/doc-config.interface';
import DialogActions from '@mui/material/DialogActions';
import AppConfirmationDialog from '../../../frontend/components/Global/app-confirmation/app-confirmation-dialog';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TrackApiCalls from "../../../frontend/components/resume-editor/track-api-calls/track-api-calls";

function EditDocument() {
	// router hooks
	const params = useParams();

	// router hooks
	const dispatch = useDispatch();
	const config = useSelector((state: RootState) => state.doc_config.config);

	const [tempConfigState, setTempConfigState] = useState<Record<string, any>>({});

	const syncingData = useSyncResumeData();

	const [refreshData, setRefreshData] = useState<number>(-1);

	// local states
	const [deletePageData, setDeletePageData] = useState<any>(null)
	const [openLeftDrawer, setOpenLeftDrawer] = useState(false);

	function confirmDelete(): void {
		deletePage(deletePageData);
	}

	const deletePageAPI = useDataModel({
		apiEndpoint: apiEndPoints.delete_page_config,
		onApiSuccess: (res) => {
			triggerSilentRefreshData();
		},
		onApiError: (errRes) => {
		}
	});

	const insertPageAPI = useDataModel({
		apiEndpoint: apiEndPoints.insert_page_config,
		onApiSuccess: (res) => {
			triggerSilentRefreshData();
		},
		onApiError: (errRes) => {
		}
	});

	function updateTempConfigState(): void {
		const _keys = Object.keys(config);
		_keys.map((item: any, index: number) => {
			tempConfigState[item] = {};
			return null;
		});
		setTempConfigState({ ...tempConfigState });
	}

	useEffect(() => {
		if (config) {
			updateTempConfigState();
		}
	}, [config]);

	function triggerSilentRefreshData(): void {
		setRefreshData(prev => {
			if (prev < 0) {
				return 1;
			} else if (prev === 1) {
				return 2;
			}
			return 1;
		});
	}

	const deletePage = (pageNo: string): void => {
		tempConfigState[pageNo].isLoading = true;
		setTempConfigState({ ...tempConfigState });
		deletePageAPI.controllers.setRequestPayload({
			documentId: config[pageNo].documentId,
			pageConfigId: config[pageNo].id
		});
	};

	const insertNewPageHandler = (): void => {
		insertPageAPI.controllers.setRequestPayload({
			documentId: params.documentId,
			mainPanel: [],
			secondaryPanel: [],
			isSecPanelVisible: true,
			secPanelPos: E_SecondaryPanelPosition.left
		});
	};

	const handleToggleTextArea = () => {
		setOpenLeftDrawer(!openLeftDrawer);
	};

	return (
		<BasePage>
			<Toolbar />
			<TrackApiCalls />
			<div style={{ marginLeft: '26px', position: 'fixed', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Button onClick={handleToggleTextArea} style={{ color: 'var(--font-color)'}}>
					{openLeftDrawer ? <MenuOpenIcon /> : <MenuIcon />}
				</Button>
				<div style={{
					transform: openLeftDrawer ? 'translate(0, 5%)' : 'scale(0.001) translate(0, 5%)',
					transition: openLeftDrawer ? 'transform 0.3s' : 'transform 0.3s'
				}}>
					{openLeftDrawer && <LeftSideDrawer />}
				</div>
			</div>
			<div className={styles.container}>
				<AdjustPanelWidth />
				<div className={styles.layoutContainer}>
					{Object.keys(config)?.map((item: any, index: number) => <div key={index} className={styles.layoutWrapper}>
						{index > 0 ? (
							<div className={styles.pageToolBar}>
								<AppConfirmationDialog onConfirm={confirmDelete} onClick={() => {
									setDeletePageData(item)
								}}>
									<Button>
										<DeleteIcon fontSize={'small'} />
									</Button>
								</AppConfirmationDialog>
							</div>
						) : null}
						<LayoutContextProvider pageNo={item}>
							<Layout pageNo={item} key={index} index={index} />
						</LayoutContextProvider>
						{tempConfigState[item]?.isLoading ? (
							<div className={styles.pageLoader}>
								<CircularProgress color='inherit' />
							</div>
						) : null}
					</div>
					)}
				</div>
				<div className={styles.newPageToolBar}>
					<Button variant={'outlined'} onClick={() => {
						insertNewPageHandler();
					}}>
						<AddCircleOutlineIcon fontSize={'small'} />
						Add New Page
					</Button>
				</div>
			</div>
			<LoadResumeData silentSync={refreshData} />
		</BasePage>
	);
}

export default EditDocument;