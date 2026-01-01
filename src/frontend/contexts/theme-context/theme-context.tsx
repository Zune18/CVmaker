import React, { createContext, useContext, useState } from 'react';

export enum ThemeTypes {
	light = 'light',
	dark = 'dark'
}

export class IThemeContext {
	theme: ThemeTypes = ThemeTypes.dark;
	setTheme: (type: ThemeTypes) => void = () => {
	};
}

export const ThemeContext = createContext<IThemeContext>({ ...new IThemeContext() });

export const useThemeContext = (): IThemeContext => useContext(ThemeContext);

interface IThemeContextProvider {
	children: React.ReactNode,
}

export const ThemeContextProvider = ({ children }: IThemeContextProvider) => {
	const [theme, setTheme] = useState<ThemeTypes>(ThemeTypes.dark);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};