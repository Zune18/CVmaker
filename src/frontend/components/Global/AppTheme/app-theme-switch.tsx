import React, { useEffect, useState } from 'react';
import { ThemeTypes, useThemeContext } from '../../../contexts/theme-context/theme-context';
import { FloatButton } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, grey, teal, indigo } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

interface IAppTheme {
    children: React.ReactNode,
}

function AppThemeSwitch(props: IAppTheme) {
	const { theme, setTheme } = useThemeContext();

	function createMuiTheme(mode: ThemeTypes = ThemeTypes.light) {
		return createTheme(getDesignTokens(mode));
	}

	const getDesignTokens = (mode: PaletteMode) => ({
		palette: {
			mode,
			...(mode === ThemeTypes.light
				? {
					// palette values for light mode
					primary: teal,
					divider: teal[200],
					background: {
						default: grey[100],
						paper: grey[100],
						primary: grey[300],
						secondary: grey[100]
					},
					text: {
						primary: grey[900],
						secondary: grey[800]
					}
				}
				: {
					// palette values for dark mode
					primary: teal,
					divider: grey[700],
					background: {
						default: grey[900],
						paper: grey[900],
						primary: '#0F131CFF',
						secondary: '#2B425EFF'
					},
					text: {
						primary: '#fff',
						secondary: grey[500]
					}
				})
		}
	});

	const [muiTheme, setMuiTheme] = useState<any>(createMuiTheme(theme));

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	const toggleTheme = () => {
		if (theme === ThemeTypes.light) {
			setTheme(ThemeTypes.dark);
			setMuiTheme(createMuiTheme(ThemeTypes.dark));
		} else {
			setTheme(ThemeTypes.light);
			setMuiTheme(createMuiTheme(ThemeTypes.light));
		}
	};
	return (
		<ThemeProvider theme={muiTheme}>
			{props.children}
			<FloatButton onClick={toggleTheme} icon={<></>} description={theme} />
		</ThemeProvider>
	);
}

export default AppThemeSwitch;