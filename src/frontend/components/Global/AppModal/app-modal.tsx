import React from 'react';
import { Modal, ModalProps } from 'antd';
import styles from './app-modal.module.scss';

export interface IAppModalProps extends ModalProps {
	modal_title?: string;
	headerPosition?: 'center' | 'left' | 'right';
	maskClosable?: boolean;
	is_modal_open: boolean;
	on_close_modal: () => void;
}

interface _IAppModalProps extends IAppModalProps {
	children: React.ReactNode;
}

function AppModal(props: _IAppModalProps) {
	const handleCancel = () => {
		if (props.on_close_modal) {
			props.on_close_modal();
		}
	};

	return (
		<Modal {...props} title={props.modal_title || ' '} open={props.is_modal_open} onCancel={handleCancel}
			   footer={null}
			   className={`${styles[props.headerPosition || 'left']} ${props.className}`}>
			{props.children}
		</Modal>
	);
};

export default AppModal;