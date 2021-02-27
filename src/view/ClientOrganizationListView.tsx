import React from "react";
import {Grid} from "@material-ui/core";
import DataTable, {DataTableRow} from "../components/DataTable"


const headers: string[] = ["ID", "First name", "Last name"]

const rows: DataTableRow[] = [
	{
		columns: [
			{name: "Id", value: "1", link: "Hello"},
			{name: "First name", value: "Alois"},
			{name: "Last name", value: "Jirásek"}
		]
	}, {
		columns: [
			{name: "Id", value: "2"},
			{name: "First name", value: "Franta"},
			{name: "Last name", value: "Josef"}
		]
	},
];


function ClientOrganizationListView() {

	return (
		<div>
			<h2>Client Organization list view</h2>
			<Grid container spacing={3}>
				<Grid item xs={10}>
					<DataTable headers={headers} rows={rows}/>
				</Grid>
			</Grid>
		</div>
	)
}

export default ClientOrganizationListView;
