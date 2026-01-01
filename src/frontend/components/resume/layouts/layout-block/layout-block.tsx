import React, { useId, useState } from 'react';
import styles from './layout-block.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLayoutContext } from '../../../../contexts/layout-context';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import TextField from '@mui/material/TextField';

interface ILayoutBlockParams {
	id: string;
	children: React.ReactNode;
	notDraggable?: boolean;
	config?: any;
	panelInfo?: any;
}

function LayoutBlock(props: ILayoutBlockParams) {
	const { children, notDraggable, config, panelInfo }: ILayoutBlockParams = props
	const userThumbnailId = useId();
	const { deleteSection, pageNo, updateSectionData } = useLayoutContext();

	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	const [editModalData, setEditModalData] = useState<any>({})

	const openDeleteConfirmation = () => {
		setDeleteConfirmationOpen(true);
	};

	const handleCloseDeleteConfirmation = () => {
		setDeleteConfirmationOpen(false);
	};

	const handleEditModalOpen = () => {
		setEditModalData({...config})
		setEditModalOpen(true);
	};

	function confirmDelete() {
		deleteSection(panelInfo, config);
		setDeleteConfirmationOpen(false);
	}

	function updateSectionDataHandler() {
		updateSectionData(panelInfo, config, editModalData)
		setEditModalOpen(false)
	}

	return (
		<>
			<div className={`${styles.layoutBlock}`} id={'layoutBlock'}>
				{!notDraggable ? (
					<div className={styles.headerRow}>
						<header id={userThumbnailId}
							className={styles.layoutBlockHeading}
						>
							{config?.customLabel || config.defaultLabel}
						</header>
						<div className={styles.menu}>
							<div className={styles.btn} onClick={openDeleteConfirmation}>
								<DeleteIcon fontSize={'small'} />
							</div>
							<div className={styles.btn} data-tooltip={'Click to Edit'} onClick={handleEditModalOpen}>
								<SettingsIcon fontSize={'small'} />
							</div>
						</div>
					</div>
				) : null}
				<div>
					{children}
				</div>
			</div>
			<Dialog
				open={deleteConfirmationOpen}
				onClose={handleCloseDeleteConfirmation}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Are you sure you want to delete?
				</DialogTitle>
				<DialogActions>
					<Button variant={'outlined'} onClick={handleCloseDeleteConfirmation}>Cancel</Button>
					<Button color={'error'} variant={'contained'} onClick={confirmDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={editModalOpen}
				onClose={() => {
					setEditModalOpen(false);
				}}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Edit Section
				</DialogTitle>
				<div className={styles.sectionEditModalBody}>
					<div className={styles.inputRow} data-tooltip={'Cannot edit default label'}>
						<TextField fullWidth label='Default Label' disabled={true} variant='standard' value={editModalData.defaultLabel} />
					</div>
					<div className={styles.inputRow}>
						<TextField fullWidth={true} label='Custom Label' variant='standard' value={editModalData.customLabel} onChange={(ev) => {
							editModalData.customLabel = ev.target.value;
							setEditModalData({...editModalData})
						}} />

					</div>
				</div>
				<DialogActions>
					<Button variant={'outlined'} onClick={() => {
						setEditModalOpen(false);
					}}>Cancel</Button>
					<Button color={'primary'} variant={'contained'} onClick={updateSectionDataHandler} autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default LayoutBlock;