import {Container} from "@material-ui/core"
import {PATH_ROUTES} from "routes"
import TableListComponent, {MyHeader} from "components/TableListComponent"
import {RowsProp} from "@material-ui/data-grid"


const rawJson = {
	headers: [
		{
			id: "id",
			displayName: "Identificator",
		},
		{
			id: "firstName",
			displayName: "First name",
		},
		{
			id: "lastName",
			displayName: "Last name"
		},
		{
			id: "phoneNumber",
			displayName: "Phone number"
		},
		{
			id: "age",
			displayName: "Age"
		},
		{
			id: "clientOrgId",
			displayName: "Client Organization Ref",
		}
	],
	rows: [
		{
			id: 4,
			firstName: "First",
			lastName: "Last",
			phoneNumber: "+420123456789",
			age: 69,
			clientOrgId: 1
		},
		{
			id: 5,
			firstName: "Second",
			lastName: "Laster",
			phoneNumber: "+4201456789",
			age: 13,
			clientOrgId: 2
		},
		{
			id: 6,
			firstName: "Third",
			lastName: "Lastest",
			phoneNumber: "+420998",
			age: 54,
			clientOrgId: 3
		},
		{
			id: 7,
			firstName: "Fourth",
			lastName: "Lasterer",
			phoneNumber: "+42012364789",
			age: 79,
			clientOrgId: 4
		}]
}


export default function DatagridTableView() {

	const jsonHeaders: MyHeader[] = rawJson.headers.map(singleHeader => {
		if (["id", "clientOrgId"].includes(singleHeader.id)) {
			return {...singleHeader, linkPath: PATH_ROUTES.clientOrganization.uri}
		} else return singleHeader
	})


	return (
		<Container>
			<h1>Datagrid table view</h1>
			<TableListComponent jsonRows={rawJson.rows as unknown as RowsProp[]} jsonHeaders={jsonHeaders}/>
		</Container>
	)
}
