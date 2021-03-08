import {createSlice} from "@reduxjs/toolkit"

export const counterSlice = createSlice({
	name: "counter",
	// usually initial state would be in store but using redux toolkit allows it to be defined here
	initialState: {
		currentCounterValue: 0
	},
	reducers: {
		increment: (state) => {
			state.currentCounterValue += 1
		},
		decrement: (state) => {
			state.currentCounterValue -= 1
		},
		incrementBy: (state, action) => {
			state.currentCounterValue += action.payload
		}
	}
})

export const {increment, decrement, incrementBy} = counterSlice.actions // make actions visible from outside

