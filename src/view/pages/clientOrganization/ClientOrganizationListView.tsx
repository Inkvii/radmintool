import React, {useEffect, useState} from "react"
import {Container} from "@material-ui/core"
import {loadClientOrganizationList} from "db/DatabaseConnector"
import DataTable, {DataTableRow} from "components/experimental/customTable/DataTable"

export default function ClientOrganizationListView() {

	const [rows, setRows] = useState<DataTableRow[]>([])
	const headers: string[] = ["ID", "Client Organization Name", "Doing Business As", "External Client Organization Id"]

	// async loading of table rows
	useEffect(() => {
		let isSubscribed = true

		const fetchMyPromise = async () => {
			const promise: DataTableRow[] = await fetchClientOrganizationListRows()
			console.debug("Promise is retrieved ")
			if (isSubscribed) {
				console.debug("Component is still mounted, updating rows")
				setRows(promise)
			}
		}
		fetchMyPromise()
		return () => {
			isSubscribed = false
		}
	}, [])

	return (
		<Container>
			<h1>Client Organization list view</h1>
			<DataTable headers={headers} rows={rows}/>
		</Container>
	)
}

async function fetchClientOrganizationListRows(): Promise<DataTableRow[]> {
	console.group("Starting to fetch rows")
	const jsonArray: any = await loadClientOrganizationList()

	console.debug("Json is loaded: " + jsonArray)

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
	})
	console.info("Json is mapped to rows")
	console.groupEnd()
	return allRows
}
