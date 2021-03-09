import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchClientOrganizationById = createAsyncThunk(
	"clientOrganization/fetchClientOrganizationById",
	async (clientOrgId: string) => {
		const response = await axios.get(`http://localhost:8080/clientOrganization/${clientOrgId}`)
		return response.data
	}
)

export const clientOrganizationSlice = createSlice({
	name: "clientOrganization",
	// usually initial state would be in store but using redux toolkit allows it to be defined here
	initialState: {

		currentClientOrganization: {id: 0, doingBusinessAs: "", externalClientOrganizationId: "", partyProperties: []}
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchClientOrganizationById.fulfilled, (state, action) => {
			state.currentClientOrganization = action.payload
		})

	}
})

// export const {} = clientOrganizationSlice.actions // make actions visible from outside

