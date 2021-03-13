import {createSlice} from "@reduxjs/toolkit"

export const profileSlice = createSlice({
	name: "profile",
	// usually initial state would be in store but using redux toolkit allows it to be defined here
	initialState: {
		authenticationToken: ""
	},
	reducers: {
		saveAuthenticationToken: (state, action) => {
			state.authenticationToken = action.payload
		}
	}
})

export const {saveAuthenticationToken} = profileSlice.actions // make actions visible from outside

