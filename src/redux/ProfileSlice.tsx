import {createSlice} from "@reduxjs/toolkit"


const authenticationTokenName = "authenticationToken"

export const profileSlice = createSlice({
	name: "profile",
	// usually initial state would be in store but using redux toolkit allows it to be defined here
	initialState: {
		authenticationToken: ""
	},
	reducers: {

		loadAuthenticationToken: (state) => {
			const token = localStorage.getItem(authenticationTokenName)
			if (token === undefined || token === null) {
				state.authenticationToken = ""
				return
			}
			console.debug("Authentication token found in local storage")
			const unjsonifiedToken = JSON.parse(token)
			state.authenticationToken = unjsonifiedToken || ""
		},

		setAuthenticationToken: (state, action) => {
			if (action.payload === undefined || action.payload === null || action.payload === "") {
				console.debug("Removing authentication token")
				localStorage.removeItem(authenticationTokenName)
				state.authenticationToken = ""
			} else {
				console.debug("Setting authentication token")
				localStorage.setItem(authenticationTokenName, JSON.stringify(action.payload))
				state.authenticationToken = action.payload
			}
		}

	}
})

export const {loadAuthenticationToken, setAuthenticationToken} = profileSlice.actions // make actions visible from outside

