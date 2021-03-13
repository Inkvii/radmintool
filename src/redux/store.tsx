import {configureStore} from "@reduxjs/toolkit"
import {counterSlice} from "redux/CounterSlice"
import {clientOrganizationSlice} from "redux/ClientOrganizationSlice"
import {profileSlice} from "redux/ProfileSlice"

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		clientOrganization: clientOrganizationSlice.reducer,
		profile: profileSlice.reducer
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
