import React from "react"
import {Paper, Table, TableContainer} from "@material-ui/core"
import TableHeader from "components/experimental/customTable/fragments/TableHeader"
import TableRows from "components/experimental/customTable/fragments/TableRows"

export type DataTableCell = {
	name: string,
	value: string,
	link?: string
}

export type DataTableRow = {
	columns: DataTableCell[]
}

type Props = {
	headers: string[],
	rows: DataTableRow[]
}

/**
 * This is an example of custom table that can handle cell with onClick method. It is very low level component but viable
 * if DataGrid cant be used
 * @param headers
 * @param rows
 * @constructor
 */
export default function DataTable({headers, rows}: Props) {

	return (
		<div style={{height: 400}}>
			<TableContainer component={Paper}>
				<Table>
					<TableHeader headers={headers}/>
					<TableRows numberOfHeaderColumns={headers.length} rows={rows}/>
				</Table>
			</TableContainer>
		</div>
	)
}

