import React from 'react';
import { ThemeContextProvider } from '../../../contexts/theme-context/theme-context';
import AppThemeSwitch from './app-theme-switch';

export function AppTheme({ children }: { children: React.ReactNode }) {
	return (
		<ThemeContextProvider>
			<AppThemeSwitch>
				{children}
			</AppThemeSwitch>
		</ThemeContextProvider>
	);
}