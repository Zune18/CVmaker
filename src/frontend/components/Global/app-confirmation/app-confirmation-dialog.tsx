import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import styles from './app-confimation.module.scss'

interface I_AppConfirmation {
	children: React.ReactNode;
	onClick: () => void;
	onConfirm: () => void;
	onCancel?: () => void;
	theme?: 'danger' | 'default';
	message?: string;
	confirmLabel?: string;
}

function AppConfirmationDialog(props: I_AppConfirmation) {
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

	const handleCloseDeleteConfirmation = () => {
		if (props.onCancel != null) {
			props.onCancel();
		}
		setDeleteConfirmationOpen(false);
	};

	function confirmDelete(): void {
		setDeleteConfirmationOpen(false);
		props.onConfirm()
	}

	function openConfirmationModal(): void {
		setDeleteConfirmationOpen(true)
		if (props.onClick) {
			props.onClick()
		}
	}

	function getButtonColor() {
		if (props.theme === 'danger') {
			return 'error'
		}

		return 'primary'
	}

	return (
		<>
			<div onClick={openConfirmationModal}>
				{props.children}
			</div>
			<Dialog
				open={deleteConfirmationOpen}
				onClose={handleCloseDeleteConfirmation}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{props.message ?? "Are you sure you want to delete Page?"}
				</DialogTitle>
				<DialogActions className={styles.buttonGrp}>
					<Button variant={'outlined'} onClick={handleCloseDeleteConfirmation}>Cancel</Button>
					<Button color={getButtonColor()} variant={'contained'} onClick={confirmDelete} autoFocus>
						{props.confirmLabel ?? "Delete"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default AppConfirmationDialog;