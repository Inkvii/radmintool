import {Button, Container} from "@material-ui/core";
import {CellParams, ColDef, DataGrid, RowsProp} from "@material-ui/data-grid";
import {PATH_ROUTES} from "../routes";
import {useHistory} from "react-router-dom";


const jsonHeaders = [
	{id: "id", displayName: "Ident of table"},
	{id: "name", displayName: "First name"},
	{id: "clientOrgId", displayName: "Ref to clientOrg"},
]

const jsonRows = [
	{id: 12345, name: "very najs", clientOrgId: 1},
	{id: 23456, name: "bjutifl", clientOrgId: 2},
	{id: 34567, name: "dandy", clientOrgId: 3}
]


export default function MegaTableVIew() {
	const history = useHistory()

	const createButtonColumn = (field: string, headerName: string, linkToTarget: string) => {
		const clickableColumnType: ColDef = {
			field: field,
			headerName: headerName,
			sortable: true,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: (params: CellParams) => (
				<Button
					onClick={() => {
						history.push(linkToTarget + "/" + params.value)
					}}
				>
					{params.value}
				</Button>
			)
		}
		return clickableColumnType
	}


	const columns: ColDef[] = jsonHeaders.map(header => {

		if (header.id === "clientOrgId") {
			return createButtonColumn(header.id, header.displayName, PATH_ROUTES.clientOrganization)
		}

		const instance: ColDef = {
			type: "string",
			field: header.id,
			headerName: header.displayName
		}
		return instance
	})

	const rows: RowsProp = jsonRows.map(row => {
		return {
			id: row.id,
			name: row.name,
			clientOrgId: row.clientOrgId
		}
	})


	// 	[
	// 	{id: 1, primaryKey: "10000", col1: 'Hello', col2: 'World'},
	// 	{id: 2, primaryKey: "10001", col1: 'Hello', col2: 'World'},
	// 	{id: 3, primaryKey: "10002", col1: 'Hello', col2: 'World'},
	// 	{id: 4, primaryKey: "10003", col1: 'Hello', col2: 'World'},
	// 	{id: 5, primaryKey: "5456", col1: 'Hello', col2: 'World'},
	// 	{id: 6, primaryKey: "979751", col1: 'Hello', col2: 'World'},
	// 	{id: 7, primaryKey: "096540", col1: 'Hello', col2: 'World'},
	// 	{id: 8, primaryKey: "97972", col1: 'Hello', col2: 'World'},
	// ];


	return (
		<Container>
			<h1>Mega table view</h1>
			<DataGrid columns={columns} rows={rows} columnBuffer={5} autoHeight={true} pageSize={5}/>
		</Container>
	)
}
