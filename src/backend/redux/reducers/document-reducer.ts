import { createSlice } from '@reduxjs/toolkit';
import { E_IntroPosition, I_DocConfig, I_DocSettings } from '../../services/resume/doc-config.interface';

interface I_INITIAL_STATE {
    config: Record<string, I_DocConfig>,
	documentInfo: Record<string, any>
    settings: I_DocSettings,
}

const INITIAL_STATE: I_INITIAL_STATE = {
	config: {},
	documentInfo: {},
	settings: {
		introPosition: E_IntroPosition.top,
		showPhoto: false
	}
}

export const ReducerDocumentConfig = createSlice({
	name: 'user_status',
	initialState: INITIAL_STATE,
	reducers: {
		ASetDocConfig: (state, action) => {
			state.config = action.payload ?? {}
			return state
		},
		ASetSecondaryPanel: (state, action) => {
			state.config[action.payload.pageNo].secondaryPanel = action.payload.val
			return state
		},
		ASetMainPanel: (state, action) => {
			state.config[action.payload.pageNo].mainPanel = action.payload.val
			return state
		},
		ASetConfigPanels: (state, action) => {
			state.config[action.payload.pageNo].secondaryPanel = action.payload.secondaryPanel
			state.config[action.payload.pageNo].mainPanel = action.payload.mainPanel
			return state
		},
		ASetDocSettings: (state, action) => {
			state.settings = action.payload;
			return state
		},
		ASetDocumentInfo: (state, action) => {
			state.documentInfo = action.payload;
			return state
		}
	}
})

// Action creators are generated for each case reducer function
export const { ASetDocConfig, ASetMainPanel, ASetSecondaryPanel, ASetDocSettings, ASetDocumentInfo, ASetConfigPanels } = ReducerDocumentConfig.actions

export default ReducerDocumentConfig.reducer