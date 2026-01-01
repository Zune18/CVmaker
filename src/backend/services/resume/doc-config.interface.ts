import { ESectionsNames, ESectionTypes } from '../../../frontend/components/resume/layouts/constants/config-constants';

export interface I_PanelConfig {
	section: ESectionsNames,
	sectionType: ESectionTypes,
}

export enum E_SecondaryPanelPosition {
	left = 'left',
	right = 'right'
}

export interface I_DocConfig {
    isLoading?: boolean;
	id: string,
	documentId: string,
	isSecPanelVisible: boolean,
	secPanelPos: E_SecondaryPanelPosition,
	secondaryPanel: I_PanelConfig[],
	mainPanel: I_PanelConfig[]
}

export enum E_IntroPosition {
	top = 'top',
	main = 'main',
	secondary = 'secondary'
}

export enum E_PanelNames {
	main = 'main',
	secondary = 'secondary'
}

export interface I_DocSettings {
	introPosition: E_IntroPosition,
	showPhoto: boolean,
	color?: string,
	bgColor?: string,
	secondaryPanelWidth?: number,
	fontSize?: string;
}
