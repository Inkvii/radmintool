import {Container} from "@material-ui/core"
import {PATH_ROUTES} from "router/routes"
import TableListComponent, {TableListComponentHeader} from "components/TableListComponent"
import {RowsProp} from "@material-ui/data-grid"
import {useEffect, useState} from "react"
import axios from "axios"

interface SimpleTableJsonData {
	headers: [{
		id: string,
		displayName: string
	}],
	rows: object[]

}

export default function DatagridTableView() {

	const [rawJson, setRawJson] = useState<SimpleTableJsonData>({headers: [{displayName: "", id: "id"}], rows: []})

	useEffect(() => {
		axios.get("http://localhost:8080/person/getAll")
			.then(response => {
				const res: SimpleTableJsonData = response.data
				setRawJson(res)
			}).catch(err => {
			console.error("Error " + err)
		})
	}, [])

	const jsonHeaders: TableListComponentHeader[] = rawJson.headers.map(singleHeader => {
		switch (singleHeader.id) {
			case "clientOrganizationReferenceId":
				return {...singleHeader, linkPath: PATH_ROUTES.clientOrganization.linkInfo.uri}
			case "id":
				return {...singleHeader, linkPath: PATH_ROUTES.person.linkInfo.uri}
			default:
				return singleHeader
		}
	})


	return (
		<Container>
			<h1>Datagrid table view</h1>
			<TableListComponent jsonRows={rawJson.rows as unknown as RowsProp[]} jsonHeaders={jsonHeaders}/>
		</Container>
	)
}
