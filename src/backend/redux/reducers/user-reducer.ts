import { createSlice } from '@reduxjs/toolkit'

interface IINITIAL_STATE {
    user: any,
    isLoggedIn: boolean
	isAdmin: boolean;
}

export enum USER_TYPES {
	admin = 'admin',
}

const INITIAL_STATE: IINITIAL_STATE = {
	user: {
		user_id: undefined
	},
	isLoggedIn: false,
	isAdmin: false
}

export const ReducerUser = createSlice({
	name: 'user_status',
	initialState: INITIAL_STATE,
	reducers: {
		ASetUser: (state, action) => {
			state.user = action.payload ?? {}
			return state
		},
		ASetIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload
			return state
		},
		ASetIsAdmin: (state, action) => {
			state.isAdmin = action.payload
			return state
		}
	}
})

// Action creators are generated for each case reducer function
export const { ASetUser, ASetIsLoggedIn, ASetIsAdmin } = ReducerUser.actions

export default ReducerUser.reducer