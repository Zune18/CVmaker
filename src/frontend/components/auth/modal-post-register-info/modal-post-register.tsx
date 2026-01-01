import React from 'react';
import AppModal, { IAppModalProps } from '../../Global/AppModal/app-modal';
import styles from './modal-post-register.module.scss';

interface IModelRegisterProps extends IAppModalProps {
    onPostRegisterDone: () => void;
}

function ModalPostRegister(props: IModelRegisterProps) {
	return (
		<AppModal
			{...props}
			modal_title={'Post Register'}
			headerPosition={'center'}
			className={styles.modalContainer}
		>
			<div className={styles.modalContainerInner}>fsdfds</div>
		</AppModal>
	);
}

export default ModalPostRegister;
