import {CircularProgress, TableBody, TableCell, TableRow} from "@material-ui/core"
import React from "react"
import {DataTableCell, DataTableRow} from "components/experimental/customTable/DataTable"
import "css.css"
import {useHistory} from "react-router-dom"
import {PATH_ROUTES} from "router/routes"

type Props = {
	numberOfHeaderColumns: number
	rows: DataTableRow[]
}

export default function TableRows({numberOfHeaderColumns, rows}: Props) {
	const history = useHistory()


	const onCellClick = (value: DataTableCell) => {
		console.debug(`Cell clicked ${value.name} ${value.value} ${value.link}`)

		if (value.link !== undefined) {
			history.push(PATH_ROUTES.clientOrganization.linkInfo.uri + "/" + value.link)

		}
	}


	const getRows = () => {

		if (rows.length < 1) {
			return (
				<TableRow>
					<TableCell colSpan={numberOfHeaderColumns} align={"center"}>
						<CircularProgress/>
					</TableCell>
				</TableRow>
			)
		}
	}

	return (
		<TableBody>

			{getRows()}

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

