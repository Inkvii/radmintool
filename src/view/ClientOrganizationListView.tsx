import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import DataTable, {DataTableRow} from "../components/DataTable"
import loadClientOrganizationList from "../db/DatabaseConnector";


const headers: string[] = ["ID", "Client Organization Name", "Doing Business As", "External Client Organization Id"]

async function fetchRows() {
	console.log("Starting to fetch rows")
	const jsonArray: any = await loadClientOrganizationList()

	console.log("Json is loaded: " + jsonArray)

	let allRows: DataTableRow[] = []

	jsonArray.forEach((row: { id: string; clientOrganizationName: string; doingBusinessAs: string; externalClientOrganizationId: string; }) => {
		let oneRow: DataTableRow = {
			columns: [
				{name: row.id, value: row.id, link: row.id},
				{name: row.clientOrganizationName, value: row.clientOrganizationName},
				{name: row.doingBusinessAs, value: row.doingBusinessAs},
				{name: row.externalClientOrganizationId, value: row.externalClientOrganizationId}
			]
		}
		allRows.push(oneRow)
	});
	console.log("Json is mapped to rows")
	return allRows
}


export default function ClientOrganizationListView() {

	const [rows, setRows] = useState<DataTableRow[]>([])

	useEffect(() => {
		const fetchMyPromise = async () => {
			const promise: DataTableRow[] = await fetchRows()
			console.log("Promise is retrieved ")
			setRows(promise)
		}
		fetchMyPromise()
	}, [])

	return (
		<div>
			<h2>Client Organization list view</h2>
			<Grid container spacing={3}>
				<Grid item xs={1}/>
				<Grid item xs={10}>
					<DataTable headers={headers} rows={rows}/>
				</Grid>
				<Grid item xs={1}/>
			</Grid>
		</div>
	)
}

