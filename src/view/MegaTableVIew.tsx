import {Container} from "@material-ui/core";
import {PATH_ROUTES} from "../routes";
import TableListComponent from "../components/TableListComponent";


export default function MegaTableVIew() {
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

	const buttonColumns = [
		{
			columnName: "clientOrgId",
			linkPath: PATH_ROUTES.clientOrganization
		}, {
			columnName: "id",
			linkPath: PATH_ROUTES.clientOrganization
		}
	]


	return (
		<Container>
			<h1>Mega table view</h1>
			<TableListComponent jsonRows={jsonRows} jsonHeaders={jsonHeaders} buttonColumns={buttonColumns}/>
		</Container>
	)
}
