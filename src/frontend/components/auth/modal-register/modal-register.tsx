import React, { useState } from 'react';
import AppModal, { IAppModalProps } from '../../Global/AppModal/app-modal';
import styles from './modal-register.module.scss';
import { Input } from 'antd';
import { getGoogleAuthUrl } from '../../../../backend/services/oauth/google-oauth';
import { Image } from '@react-pdf/renderer';
import { ImageStyle } from '../../resume/pdfViewer/default-stylesheet';

interface IModelRegisterProps extends IAppModalProps {
    openLoginModal: () => void;
    openPostRegistrationModal: () => void;
}

function ModalRegister(props: IModelRegisterProps) {
	//   const url = "";
	const [data, setdata] = useState({
		fname: '',
		email: '',
		fpass: '',
		lpass: ''
	});

	const onInputChangehandle = (e: any) => {
		const { name, value } = e.target;
		setdata({ ...data, [name]: value });
		// console.log(data)
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		props.openPostRegistrationModal();
		console.log(data);
	};
	//     axios
	//       .post('https://api-cvm-staging.up.railway.app/api/v1/auth/user/login', {
	//         fname: data.fname,
	//         lname: data.lname,
	//         email: data.email,
	//         fpass: data.fpass,
	//         lpass: data.lpass,
	//       })
	//       .then((res) => {
	//         console.log(res.data);
	//       });
	//   }

	return (
		<AppModal
			{...props}
			modal_title={''}
			headerPosition={'center'}
			className={styles.modalContainer}
		>
			<div className={styles.modalContainerInner}>
				<div className={styles.modalContainerInnerLeftPanel} />
				<div className={styles.modalContainerInnerRightPanel}>
					<div className={styles.headerContainer}>
						<header>Hello!</header>
						<header>Create Your Account Now</header>
					</div>
					<div className={styles.inputFieldsGroup}>
						<Input
							onChange={onInputChangehandle}
							name="fname"
							value={data.fname}
							className={`${styles.inputFields} ${styles.inputFieldFirst}`}
							placeholder="Name"
						/>
						<Input
							onChange={onInputChangehandle}
							name="fpass"
							value={data.fpass}
							className={styles.inputFields}
							placeholder="Email"
						/>
						<Input.Password
							onChange={onInputChangehandle}
							name="lpass"
							value={data.lpass}
							className={`${styles.inputFields} ${styles.inputFieldLast}`}
							placeholder="Password"
						/>
					</div>
					<button
						className={styles.registerBtn}
						onClick={handleSubmit}
					>
                        REGISTER
					</button>
					<div className={styles.signInGroup}>
						<header>Already have an account?</header>
						<header onClick={props.openLoginModal}>Log In</header>
					</div>
					<div className={styles.line}>
						<header />
						<span>OR</span>
						<header />
					</div>
					<button
						className={styles.googleLoginBtn}
						onClick={() => {
							window.location.replace(getGoogleAuthUrl());
						}}
					>
						<img
							src="/assets/icons/logos/google-svgrepo-com.svg"
							alt="google logo"
						/>
                        Continue with google
					</button>
				</div>
			</div>
		</AppModal>
	);
}

export default ModalRegister;
