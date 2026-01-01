import {createSlice} from '@reduxjs/toolkit';

interface I_INITIAL_STATE {
	personal_information: any
	pagewise_data: Record<string, any>
}

const INITIAL_STATE: I_INITIAL_STATE = {
	personal_information: {},
	pagewise_data: {}
}

export const ReducerDocumentData = createSlice({
	name: 'document_data',
	initialState: INITIAL_STATE,
	reducers: {
		ASetPersonalInformation: (state, action) => {
			state.personal_information = action.payload;
			return state;
		},
		ASetPageWiseData: (state, action) => {
			state.pagewise_data = action.payload ?? {}
			return state;
		},
		AResetDocumentData: (state) => {
			state.personal_information = {}
			state.pagewise_data = {}
			return state;
		},
		ASetSkills: (state, action) => {
			if (state.pagewise_data[action.payload.pageNo]) {
				state.pagewise_data[action.payload.pageNo].skills = action.payload.skills
			}
			return state;
		},
		ASetInterests: (state, action) => {
			if (state.pagewise_data[action.payload.pageNo]) {
				state.pagewise_data[action.payload.pageNo].interests = action.payload.interests
			}
			return state;
		},
		ASetWorkExps: (state, action) => {
			if (state.pagewise_data[action.payload.pageNo]) {
				state.pagewise_data[action.payload.pageNo].work_exps = action.payload.work_exps
			}
			return state;
		},
		ASetEducations: (state, action) => {
			if (state.pagewise_data[action.payload.pageNo]) {
				state.pagewise_data[action.payload.pageNo].educations = action.payload.educations
			}
			return state;
		},
		ASetProjects: (state, action) => {
			if (state.pagewise_data[action.payload.pageNo]) {
				state.pagewise_data[action.payload.pageNo].projects = action.payload.projects
			}
			return state;
		},
		ASetAchievements: (state, action) => {
			if (state.pagewise_data[action.payload.pageNo]) {
				state.pagewise_data[action.payload.pageNo].achievements = action.payload.achievements
			}
			return state;
		}

	}
})

export const {ASetPersonalInformation, ASetEducations,
	ASetPageWiseData, AResetDocumentData, ASetSkills,
	ASetInterests, ASetWorkExps, ASetProjects, ASetAchievements} = ReducerDocumentData.actions

export default ReducerDocumentData.reducer