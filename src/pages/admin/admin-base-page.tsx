import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../backend/redux/store';
import AppLink from '../../frontend/components/Global/AppLink/app-link';
import { APP_PATHS } from '../../frontend/components/Global/global-paths/global-paths';

interface I_AdminBasePage {
	children: React.ReactNode
}

function AdminBasePage({children}: I_AdminBasePage) {
	const isAdmin = useSelector((state: RootState) => state.user_status.isAdmin)

	if (!isAdmin) {
		return (
			<>
				<AppLink to={APP_PATHS.HOME.path}>
					Home
				</AppLink>
			</>
		)
	}
	return (
		<>
			{children}
		</>
	);
}

export default AdminBasePage;