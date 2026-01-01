import React, {useEffect} from 'react'; // 🔹 useEffect added
import AppModal, {IAppModalProps} from '../../Global/AppModal/app-modal';
import styles from './modal-login.module.scss';
import {getGoogleAuthUrl} from '../../../../backend/services/oauth/google-oauth';
import {useDispatch} from 'react-redux';
import {ASetUser} from '../../../../backend/redux/reducers/user-reducer';
import {useDataModel} from '../../../hooks/useDataModel';
import {apiEndPoints} from '../../../../backend/services/constants';
import FullLoader from '../../Global/Loaders/full-loader';
import {
    EncryptedStorage,
    EncryptedStorageKeys
} from '../../../../backend/services/encrypted-storage/encrypted-storage';
import {AppToastController} from "../../../app-toast-notification/app-toast-controller";

interface IModelRegisterProps extends IAppModalProps {
    openRegisterModal: () => void;
}

function ModalLogin(props: IModelRegisterProps) {

    const dispatch = useDispatch();

    const loginAPI = useDataModel({
        apiEndpoint: apiEndPoints.login,
        beforeApiCall: AppToastController.hideToast,
        onApiSuccess: (res) => {
            dispatch(ASetUser(res.data.user));
            EncryptedStorage.setItem(
                EncryptedStorageKeys.sessionId,
                res.data.sessionId
            );

        },
        onApiError: (data) => {
            AppToastController.showToast(data.message, loginAPI.getRequestId());
        }
    });

    const HARDCODED_CREDENTIALS = {
        email: 'tenant1@cvmaker.com',
        password: 'cvmaker'
    };

    useEffect(() => {
        loginAPI.controllers.setRequestPayload(HARDCODED_CREDENTIALS);
    }, []);

    return (
        <>
            <FullLoader isOpen={loginAPI.isLoading} />
        </>
    );
}

export default ModalLogin;
