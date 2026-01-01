import * as React from 'react';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Template from './pages/template/template';
import { AppTheme } from './frontend/components/Global/AppTheme/app-theme';
import EditDocument from './pages/documents/editor/edit-document';
import AppHeader from './frontend/components/Global/AppHeader/app-header';
import { Provider } from 'react-redux';
import { persistor, store } from './backend/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalHoc from './frontend/components/Global/global-hoc/global-hoc';
import Mydocuments from './pages/mydocument/my-document';
import {
	editResumePath,
	mydocumentsPath,
	APP_PATHS,
	resumeTemplatesPath,
	templatePath
} from './frontend/components/Global/global-paths/global-paths';
import ResumeViewer from './pages/resume-viewer/resume-viewer';
import ProfilePage from './pages/profile/profile-page';
import ManageTemplates from './pages/admin/manage-templates/manage-templates';

// upgraded to v6 react router dom

export const router = [
	{
		path: '/',
		element: <Dashboard />
	},
	{
		path: templatePath,
		element: <Template />
	},
	{
		path: resumeTemplatesPath,
		element: <h1> ResumeTemplates </h1>
	},
	{
		path: mydocumentsPath,
		element: <Mydocuments/>
	},
	{
		path: `${editResumePath}/:documentId`,
		element: <EditDocument />
	},
	{
		path: '/resume-viewer',
		element: <ResumeViewer />
	},
	{
		path: APP_PATHS.PROFILE.path,
		element: <ProfilePage />
	},
	{
		path: APP_PATHS.MANAGE_TEMPLATES.path,
		element: <ManageTemplates />
	}
];

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<GlobalHoc>
						<AppTheme>
							<AppHeader />
							<Routes>
								{router.map((item, index) => (
									<Route
										key={index}
										path={item.path}
										element={item.element}
									/>
								))}

								{/* Fall back route navigates you to dashboard */}
								<Route
									path={'*'}
									element={<Navigate to="/" />}
								/>
							</Routes>
						</AppTheme>
					</GlobalHoc>
				</PersistGate>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
