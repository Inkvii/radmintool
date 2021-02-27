import React from "react";
import {Paper, Table, TableContainer} from "@material-ui/core";
import TableHeader from "./fragments/TableHeader";
import TableRows from "./fragments/TableRows";

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

