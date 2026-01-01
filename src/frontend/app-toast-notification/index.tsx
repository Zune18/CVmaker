import React from 'react';
import {ToastContainer} from 'react-toastify';
import styles from './index.module.scss'
import {APP_TOAST_TIME} from "./app-toast-controller";

function AppToastNotification() {
	return (
		<>
			<ToastContainer
				position={"top-right"}
				autoClose={APP_TOAST_TIME}
				draggable={false}
				hideProgressBar={true}
				pauseOnHover={true}
				newestOnTop={true}
				toastClassName={styles.toastClassName}
				bodyClassName={styles.bodyClassName}
				theme={'light'}
			/>
		</>
	);
}

export default AppToastNotification;