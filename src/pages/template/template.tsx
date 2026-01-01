import * as React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDataModel} from '../../frontend/hooks/useDataModel';
import {apiEndPoints} from '../../backend/services/constants';
import BasePage from '../../frontend/components/Global/BasePage/base-page';
import AppLink from "../../frontend/components/Global/AppLink/app-link";
import 'react-toastify/dist/ReactToastify.css';
import {AppToastController} from "../../frontend/app-toast-notification/app-toast-controller";

function Template() {
	const {t, i18n} = useTranslation([]);

	const [payload, setPayload] = useState<any>(null);

	const testDataModel = useDataModel({
		apiEndpoint: apiEndPoints.test_api,
		method: 'get',
		onCancel: AppToastController.hideToast,
		onApiSuccess: (data) => {
		},
		catch: (res) => {
			AppToastController.hideToast(testDataModel.getRequestId());
		},
		then: (res) => {
			if (res.errors && res.errors.length) {
				AppToastController.completeToast(testDataModel.getRequestId(), 'Failed done .......')
			} else {
				AppToastController.completeToast(testDataModel.getRequestId(), 'Success done .......')
			}
		}
	});

	function changeLanguage(e: any) {
		void i18n.changeLanguage(e.target.value);
	}

	return (
		<BasePage>
			<AppLink to={'/'}>DashBoard</AppLink>
			<h1>{t('hello')}</h1>
			<button onClick={changeLanguage} value='en'>English</button>
			<button onClick={changeLanguage} value='hindi'>Hindi</button>
			<h1>
				{t('i_am_template')}
			</h1>
			<button onClick={() => {
				testDataModel.controllers.setRequestPayload({num: Math.random()}, true);
				AppToastController.loadingToast(testDataModel.getRequestId(), 'Syncing .......')
			}}>Refresh
			</button>
			<button onClick={() => {
				testDataModel.controllers.abortRequest();
			}}>Abort
			</button>
			<div>{testDataModel.isLoading ? 'Loading' : 'Done'}</div>
		</BasePage>
	);
}

export default Template;