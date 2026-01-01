import React, { useId, useMemo, useState } from 'react';
import styles from './app-header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import AppLink from '../AppLink/app-link';
import ModalRegister from '../../auth/modal-register/modal-register';
import ModalLogin from '../../auth/modal-login/modal-login';
import { useDataModel } from '../../../hooks/useDataModel';
import { apiEndPoints } from '../../../../backend/services/constants';
import { getFirstLetterFromString } from '../../app-utils/global-utils';
import AppMenu from '../app-menu/app-menu';
import FullLoader from '../Loaders/full-loader';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../backend/redux/store';
import { ASetUser } from '../../../../backend/redux/reducers/user-reducer';
import {
	EncryptedStorage,
	EncryptedStorageKeys
} from '../../../../backend/services/encrypted-storage/encrypted-storage';
import {
	editResumePath,
	mydocumentsPath,
	APP_PATHS
} from '../global-paths/global-paths';
import ModalPostRegister from '../../auth/modal-post-register-info/modal-post-register';
import AppToastNotification from "../../../app-toast-notification";

const HeaderHiddenLinks = [editResumePath];

function AppHeader() {
	const dispatch = useDispatch();
	const location = useLocation();
	const isLoggedIn = useSelector(
		(state: RootState) => state.user_status.isLoggedIn
	);
	const isAdmin = useSelector((state: RootState) => state.user_status.isAdmin);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isPostRegisterModalOpen, setIsPostRegisterModalOpen] =
        useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const currentUserData = useSelector(
		(state: RootState) => state.user_status.user
	);

	const signoutHandler = () => {
		signOutAPI.controllers.refreshData();
	};

	function switchToRegister() {
		setIsRegisterModalOpen(true);
		setIsLoginModalOpen(false);
	}

	function switchToLogin() {
		setIsRegisterModalOpen(false);
		setIsLoginModalOpen(true);
	}

	function switchLoginRegisterModal() {
		if (isRegisterModalOpen) {
			setIsRegisterModalOpen(false);
			setIsLoginModalOpen(true);
		} else {
			setIsRegisterModalOpen(true);
			setIsLoginModalOpen(false);
		}
	}

	function openPostRegistrationModal() {
		setIsRegisterModalOpen(false);
		setIsPostRegisterModalOpen(true);
	}

	// need to work on api call
	const signOutAPI = useDataModel({
		apiEndpoint: apiEndPoints.signOut,
		method: 'post',
		automatic: false,
		payload: null,
		onApiSuccess: (res) => {
			dispatch(ASetUser({}));
			EncryptedStorage.clearItem(EncryptedStorageKeys.sessionId);
		}
	});

	const userThumbnailId = useId();

	const isHidden = useMemo(
		() => HeaderHiddenLinks.some((i) => location.pathname.startsWith(i)),
		[location]
	);

	return (
		<>
			{!isHidden ? (
				<>
					<div className={`${styles.container}`}>
						<div>
							<AppLink to="/">
								<img
									src="/assets/images/dashboard/cvlogo.png"
									alt="logo"
									className={styles.brandLogo}
								/>
							</AppLink>
						</div>

						<div className={styles.headerLinkContainer}>
							{/* <div>
								<AppLink to={'/resume-templates'}>
                                    Resume Templates
								</AppLink>
							</div> */}
							{isLoggedIn ? (
								<div className={styles.loginDetails}>
									<div className={styles.myDocuments}>
										<NavLink
											className={styles.mydocuments}
											to={mydocumentsPath}
										>
                                            My Documents{' '}
										</NavLink>
									</div>
									{/* <div>
										<div
											id={userThumbnailId}
											className={styles.photo}
										>
											{getFirstLetterFromString(
												currentUserData.name
											).toUpperCase()}
										</div>
									</div> */}
								</div>
							) : (
								<>
									<div
										onClick={() => {
											setIsRegisterModalOpen(true);
										}}
										className={styles.registerButton}
									>
                                        Register
									</div>
									<div
										onClick={() => {
											setIsLoginModalOpen(true);
										}}
										className={styles.registerButton}
									>
                                        Login
									</div>
								</>
							)}
						</div>
						<ModalRegister
							openLoginModal={switchLoginRegisterModal}
							is_modal_open={isRegisterModalOpen}
							openPostRegistrationModal={
								openPostRegistrationModal
							}
							on_close_modal={() => {
								setIsRegisterModalOpen(false);
							}}
						/>
						<ModalLogin
							is_modal_open={isLoginModalOpen}
							on_close_modal={() => {
								setIsLoginModalOpen(false);
							}}
							openRegisterModal={switchToRegister}
						/>
						<ModalPostRegister
							is_modal_open={isPostRegisterModalOpen}
							onPostRegisterDone={() => {
							}}
							on_close_modal={() => {
								setIsPostRegisterModalOpen(false);
							}}
						/>
					</div>

					<AppMenu
						anchorId={userThumbnailId}
						renderCondition={isLoggedIn}
					>
						<div className={styles.menu}>
							<div className={styles.dropDownTopContainer}>
								<div className={styles.menuphoto}>
									{getFirstLetterFromString(
										currentUserData.name
									).toUpperCase()}
								</div>
								<div className={styles.firstcontainer}>
									<div>{currentUserData.name}</div>
									<div>{currentUserData.email}</div>
								</div>
							</div>
							<div>
								<hr />
							</div>
							<AppLink to={APP_PATHS.PROFILE.path}>
								<div className={styles.functionalities}>
									<div className={styles.logOutButton}>
										<AccountCircleIcon />
										<div className={styles.title}>
                                            Your Profile
										</div>
									</div>
								</div>
							</AppLink>
							{isAdmin ? (
								<AppLink to={APP_PATHS.MANAGE_TEMPLATES.path}>
									<div className={styles.functionalities}>
										<div className={styles.logOutButton}>
											<FileCopyIcon />
											<div className={styles.title}>
											Manage Templates
											</div>
										</div>
									</div>
								</AppLink>
							) : null}
							<div className={styles.functionalities}>
								<div
									className={styles.logOutButton}
									onClick={() => {
										signoutHandler();
									}}
								>
									<LogoutIcon />
									<div className={styles.title}>Sign out</div>
								</div>
							</div>
						</div>
					</AppMenu>
					<FullLoader isOpen={signOutAPI.isLoading} />
				</>
			) : null}
			<AppToastNotification />
		</>
	);
}

export default AppHeader;
