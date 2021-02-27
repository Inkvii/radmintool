import {TableBody, TableCell, TableRow} from "@material-ui/core";
import React, {useState} from "react";
import {DataTableCell, DataTableRow} from "../DataTable";
import "../../css.css";
import {useHistory} from "react-router-dom";
import {PATH_ROUTES} from "../../routes";

type Props = {
	rows: DataTableRow[]
}

export default function TableRows({rows}: Props) {
	const history = useHistory()

	const [stateRows, setStateRows] = useState(rows)

	const onCellClick = (value: DataTableCell) => {
		console.log(`Cell clicked ${value.name} ${value.value} ${value.link}`)

		if (value.link !== undefined) {
			history.push(PATH_ROUTES.clientOrganization + "/" + value.link);

		}
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
			))}

		</TableBody>
	)

}

