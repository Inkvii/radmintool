import {createSlice} from "@reduxjs/toolkit"

export const profileSlice = createSlice({
	name: "profile",
	// usually initial state would be in store but using redux toolkit allows it to be defined here
	initialState: {
		isLoggedIn: false
	},
	reducers: {

	}
})

// export const {} = profileSlice.actions // make actions visible from outside

