import {Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import {useState} from "react"
import EditableTextField from "components/EditableTextField"
import axios from "axios"
import CustomSnackbar from "components/CustomSnackbar"
import {ClientOrganization} from "BackendObjects"

interface Props {
	organization: ClientOrganization
}

export default function BasicInfo({organization}: Props) {

	const [editMode, setEditMode] = useState<boolean>(false)
	const [changedColumns, setChangedColumns] = useState<Map<string, string>>(new Map())
	const [openAlertBox, setOpenAlertBox] = useState(false)
	const [alertBoxMessage, setAlertBoxMessage] = useState<string>("")
	const [alertBoxSeverity, setAlertBoxSeverity] = useState<'success' | 'info' | 'warning' | 'error'>("success")


	const captureChangedColumn = (fieldName: string, changedValue: string) => {
		console.debug(`Value of field ${fieldName} has been changed to ${changedValue}`)
		changedColumns.set(fieldName, changedValue)
	}

	/**
	 * Example of communicating with backend
	 */
	const saveChanges = () => {
		setEditMode(false)
		const id = organization.id

		// Transforming map to array. As the map contains all fields whose current values dont equal value provided by backend
		// it would be pain to do manually
		const payload = Array.from(changedColumns, ([name, value]) => ({name, value}))


		console.debug(`Before sending: ${JSON.stringify(payload)}`)
		if (payload.length < 1) {
			// if there are no changes, dont bother backend
			return
		}

		axios.post(`http://localhost:8080/clientOrganization/${id}/update`, payload).then(res => {
				console.debug("Update finished " + res.data.toString())
				setChangedColumns(new Map())
				setOpenAlertBox(true)
				setAlertBoxMessage("Updating client organization was successful")
				setAlertBoxSeverity("success")
			}
		).catch(error => {
			console.error(error)
			setOpenAlertBox(true)
			setAlertBoxMessage("Error was caught during the update")
			setAlertBoxSeverity("error")
		})
	}

	/**
	 * Example of editable text field
	 * @param name
	 * @param value
	 * @constructor
	 */
	const CreateTableRow = (name: string, value: string | number) => (
		<TableRow>
			<TableCell align={"left"} style={{width: "50%"}} variant={"head"}>{name}</TableCell>
			<TableCell><EditableTextField fieldName={name} value={value.toString()} editMode={editMode} callbackOnChange={captureChangedColumn}/></TableCell>
		</TableRow>
	)


	return (
		<Card>
			<CardContent>
				<h2>Basic information about client organization {organization.externalClientOrganizationId}</h2>
				<TableContainer>
					<Table>
						<TableBody>
							{CreateTableRow("Id", organization.id)}
							{CreateTableRow("Doing business as", organization.doingBusinessAs)}
							{CreateTableRow("External client organization id", organization.externalClientOrganizationId)}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>

			<CardActions>
				{!editMode &&
				<Button color={"primary"} variant={"contained"} onClick={() => setEditMode(!editMode)}>Edit client organization</Button>}
				{editMode &&
				<Button color={"primary"} variant={"outlined"} onClick={() => saveChanges()}>Save client organization</Button>}
				<Button variant={"outlined"} color={"primary"} disabled>Delete client organization</Button>
			</CardActions>

			<CustomSnackbar message={alertBoxMessage} shouldOpen={openAlertBox} severity={alertBoxSeverity}
			                callbackAfterClosingAlert={() => setOpenAlertBox(false)}/>
		</Card>
	)
}
