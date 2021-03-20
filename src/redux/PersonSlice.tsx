import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {Person} from "BackendObjects"

export const fetchPersonById = createAsyncThunk(
	"person/fetchPersonById",
	async (personId: string) => {
		const response = await axios.get(`http://localhost:8080/person/${personId}`)
		return response.data
	}
)

const defaultPerson: Person = {
	id: 0,
	clientOrganizationReference: 0,
	age: 0,
	lastName: "",
	firstName: "",
	transactionHistory: []
}


export const personSlice = createSlice({
	name: "clientOrganization",
	// usually initial state would be in store but using redux toolkit allows it to be defined here
	initialState: {
		currentPerson: defaultPerson
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPersonById.fulfilled, (state, action) => {
			state.currentPerson = action.payload
		})

	}
})

// export const {} = personSlice.actions // make actions visible from outside

