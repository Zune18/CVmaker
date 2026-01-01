import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../backend/redux/store';
import styles from './toolbar.module.scss';
import ReactPDF from '@react-pdf/renderer';
import TuneIcon from '@mui/icons-material/Tune';
import PdfViewer from '../../resume/pdfViewer/pdf-viewer';
import MuiModal from '../../Global/mui-modal/mui-modal';
import Checkbox from '@mui/material/Checkbox';
import { Button, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { ASetDocSettings } from '../../../../backend/redux/reducers/document-reducer';
import { E_IntroPosition, I_DocSettings } from '../../../../backend/services/resume/doc-config.interface';
import pdf = ReactPDF.pdf;
import AppLink from '../../Global/AppLink/app-link';
import { APP_PATHS } from '../../Global/global-paths/global-paths';

const BG_COLORS = [
	'#3f0000',
	'#063f00',
	'#000a3f',
	'#6e007a',
	'#8f8300',
	'#005b41',
	'#606060'
]

function Toolbar() {
	// redux hooks
	const dispatch = useDispatch();
	const config = useSelector((state: RootState) => state.doc_config.config);
	const docSettings = useSelector((state: RootState) => state.doc_config.settings);
	const intro = useSelector((state: RootState) => state.doc_data.personal_information);
	const docData = useSelector((state: RootState) => state.doc_data.pagewise_data);
	const documentInfo = useSelector((state: RootState) => state.doc_config.documentInfo);

	// local states
	const [isDownloading, setIsDownloading] = useState<boolean>(false);

	// modal flags
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	async function downloadPDf(): Promise<void> {
		const blob = await pdf(PdfViewer({ config, settings: docSettings, intro, docInfo: documentInfo, docData: docData })).toBlob();
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = documentInfo.name;
		document.body.append(link);
		link.click();
		link.remove();
		setIsDownloading(false);
	}

	function handleDownload(): void {
		if (isDownloading) {
			return;
		}
		setIsDownloading(true);
		void downloadPDf().then();
	}

	const [settingModalData, setSettingsModalData] = useState<I_DocSettings>({
		bgColor: '',
		color: '',
		fontSize: 'medium',
		introPosition: E_IntroPosition.top,
		secondaryPanelWidth: 0,
		showPhoto: false
	});

	function openSettingsModal() {
		setSettingsModalData({ ...docSettings });
		setIsSettingsOpen(true);
	}

	function saveSettings() {
		const newSettings = {...docSettings, ...settingModalData};
		console.log(newSettings);
		dispatch(ASetDocSettings(newSettings));
		setIsSettingsOpen(false)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.settingsBtn} onClick={openSettingsModal} data-tooltip={'change settings'}>
					<TuneIcon fontSize={'small'} />
					<header>Settings</header>
				</div>
				<div onClick={handleDownload} className={styles.downloadBtn}>
					<img src='/assets/icons/common/light-download.png' alt='download' />
					<header>{!isDownloading ? 'Download' : 'loading'}</header>
				</div>
			</div>

			{/* TODO: ui needs improvement */}
			<div className={styles.appHeader}>
				<AppLink to={APP_PATHS.HOME.path} className={styles.headerLink}>
					CvMaker
				</AppLink>
				<AppLink to={APP_PATHS.MY_DOCUMENTS.path} className={styles.headerLink}>
					Documents
				</AppLink>
			</div>
			<div className={styles.placeHolder}>&nbsp;</div>
			<MuiModal open={isSettingsOpen} setOpen={setIsSettingsOpen} className={styles.settingModal}>
				<header className={styles.heading}>Settings</header>
				<div className={styles.modalBody}>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={styles.settingsRow}>
						<label>Show Photo</label>
						<Checkbox size={'small'} checked={settingModalData.showPhoto} onChange={() => {
							settingModalData.showPhoto = !settingModalData.showPhoto;
							setSettingsModalData({ ...settingModalData });
						}} inputProps={{ 'aria-label': 'controlled' }} />
					</Stack>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={styles.settingsRow}>
						<label>Background Color</label>
						<Select
							className={styles.selectColor}
							variant={'standard'}
							size={'small'}
							value={settingModalData.bgColor}
							onChange={(ev) => {
								settingModalData.bgColor = ev.target.value;
								setSettingsModalData({...settingModalData})
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{BG_COLORS.map((color, index) => (
								<MenuItem key={index} value={color}>
									<div className={styles.colorBlock} style={{background: color}}>&nbsp;</div>
								</MenuItem>
							))}
						</Select>
					</Stack>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={styles.settingsRow}>
						<label>Font Size</label>
						<Select
							className={styles.selectColor}
							variant={'standard'}
							size={'small'}
							value={settingModalData.fontSize}
							onChange={(ev) => {
								settingModalData.fontSize = ev.target.value
								setSettingsModalData({...settingModalData})
							}}
						>
							<MenuItem value={'small'}>
								<em>Small</em>
							</MenuItem>
							<MenuItem value={'medium'}>
								<em>Medium</em>
							</MenuItem>
							<MenuItem value={'large'}>
								<em>Large</em>
							</MenuItem>
						</Select>
					</Stack>
				</div>
				<Stack spacing={2} direction="row">
					<Button variant='contained' size={'small'} onClick={saveSettings}>Save</Button>
					<Button variant='outlined' size={'small'} onClick={() => { setIsSettingsOpen(false); }}>Cancel</Button>
				</Stack>
			</MuiModal>
		</>
	);
}

export default Toolbar;