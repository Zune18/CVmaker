import { I_DocConfig, I_DocSettings } from './doc-config.interface';

export function getPanelWidthFromSettings(settings: I_DocSettings): number {
	return settings.secondaryPanelWidth ?? 40;
}

export function getPanelWidths(settings: I_DocSettings, pageConfig: I_DocConfig): { main: string, secondary: string } {
	const widths = {
		main: '100%',
		secondary: '0%'
	};

	if (!pageConfig.isSecPanelVisible) {
		return widths;
	}

	const secondaryPanelWidth = getPanelWidthFromSettings(settings)
	const mainPanelWidth = 100 - secondaryPanelWidth;

	widths.main = `${mainPanelWidth}%`;
	widths.secondary = `${secondaryPanelWidth}%`;

	return widths;
}