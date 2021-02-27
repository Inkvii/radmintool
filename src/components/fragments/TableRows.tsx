import {TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import {DataTableCell, DataTableRow} from "../DataTable";
import "../../css.css";

type Props = {
	rows: DataTableRow[]
}

export default function TableRows({rows}: Props) {

	const onCellClick = (value: DataTableCell) => {
		console.log(`Cell clicked ${value.name} ${value.value} ${value.link}`)
	}

	return (
		<TableBody>
			{rows.map((row, index) => (
				<TableRow key={index}>
					{
						row.columns.map((cell, index) => (
							<TableCell key={index} component={"td"} scope={"row"}
							           onClick={() => onCellClick(cell)}
							           className={cell.link === undefined ? "unlinked-cell" : "linked-cell"}
							>
								{cell.value}
							</TableCell>))
					}
				</TableRow>
			))
			}

		</TableBody>
	)

}

