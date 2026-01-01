import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE: Record<string, any> = {}

export const EditorApiReducer = createSlice({
	name: 'editor_api_status',
	initialState: INITIAL_STATE,
	reducers: {
		ASetEditorAPIStatus: (state, action) => {
			state[action.payload.api_name] = action.payload.state
			return state
		},
		AClearEditorAPIStatus: (state) => {
			state = {}
			return state
		}
	}
})

export const { ASetEditorAPIStatus, AClearEditorAPIStatus } = EditorApiReducer.actions
export default EditorApiReducer.reducer