import React from 'react';
import styles from './index.module.scss'
import {AppToastController} from "../app-toast-controller";
import {v4 as uuidv4} from 'uuid'
import CircularProgress from '@mui/material/CircularProgress';

export function NetworkErrorToast(): void {
	AppToastController.showToast("Please check your internet connection.")
}

export function createToastComponent(children: any): React.ReactNode {
	return <div id={uuidv4()} className={styles.toastContainer}>
		{children}
	</div>
}

export function LoadingToast({children}: any): any {
	return <div className={styles.loadingToast}>
		<CircularProgress size={18} />
		{children}
	</div>
}