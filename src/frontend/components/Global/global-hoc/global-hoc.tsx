import { useDispatch, useSelector } from 'react-redux';
import { useDataModel } from '../../../hooks/useDataModel';
import { apiEndPoints, apiVersions } from '../../../../backend/services/constants';
import { ASetIsAdmin, ASetIsLoggedIn, ASetUser, USER_TYPES } from '../../../../backend/redux/reducers/user-reducer';
import React, { useEffect } from 'react';
import { IFetchDataResponse } from '../../../../backend/services/fetch-data';
import { useLocation } from 'react-router-dom';
import {
	EncryptedStorage,
	EncryptedStorageKeys
} from '../../../../backend/services/encrypted-storage/encrypted-storage';

interface IGlobalHOC {
    children: React.ReactNode;
}

const GlobalHoc = ({ children }: IGlobalHOC) => {
	const currentUser = useSelector((state: any) => state.user_status.user);
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	useEffect(() => {
		if (currentUser?.id) {
			dispatch(ASetIsLoggedIn(true));
		} else {
			dispatch(ASetIsLoggedIn(false));
		}

		if (currentUser?.role === USER_TYPES.admin) {
			dispatch(ASetIsAdmin(true))
		} else {
			dispatch(ASetIsAdmin(false))
		}
	}, [currentUser]);

	const currentUserModel = useDataModel({
		apiEndpoint: apiEndPoints.get_me,
		method: 'post',
		automatic: true,
		apiVersion: apiVersions.apiV1,
		onApiSuccess: (res: IFetchDataResponse) => {
			dispatch(ASetUser(res.data.currentUser));
		},
		onApiError: (res: IFetchDataResponse) => {
			dispatch(ASetUser({}));
			EncryptedStorage.clearItem(EncryptedStorageKeys.sessionId);
		}
	});

	return (
		<>
			{children}
		</>
	);
};

export default GlobalHoc;