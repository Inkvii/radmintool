import {useHistory} from "react-router-dom";
import {CellParams, ColDef, DataGrid, RowsProp} from "@material-ui/data-grid";
import {Button} from "@material-ui/core";


interface MyHeader {
	id: string,
	displayName: string
}

interface MyRows {
	id: string | number,
	name: string,
	clientOrgId: number
}

interface ButtonColumns {
	columnName: string,
	linkPath: string
}

interface Props {
	jsonHeaders: MyHeader[]
	jsonRows: MyRows[],
	buttonColumns: ButtonColumns[]
}

export default function TableListComponent({jsonRows, jsonHeaders, buttonColumns}: Props) {
	const history = useHistory()

	const createButtonColumn = (field: string, headerName: string, linkToTarget: string) => {
		const clickableColumnType: ColDef = {
			field: field,
			headerName: headerName,
			sortable: true,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: (params: CellParams) => (
				<Button variant={"outlined"} color={"primary"}
				        onClick={() => {
					        history.push(linkToTarget + "/" + params.value)
				        }}
				>
					{params.value}
				</Button>
			)
		}
		return clickableColumnType
	}

	const columns: ColDef[] = jsonHeaders.map(header => {

		console.log(`Header ${header} has ${header.id}`)

		buttonColumns.forEach(value => {
			console.log(`Value ${value.columnName} compared to ${header.id}`)
		})

		const result = buttonColumns.find(value => value.columnName == header.id)

		if (result !== null && result !== undefined) {
			return createButtonColumn(result.columnName, header.displayName, result.linkPath)
		}


		const instance: ColDef = {
			type: "string",
			field: header.id,
			headerName: header.displayName
		}
		return instance
	})

	const rows: RowsProp = jsonRows.map(row => {
		return {
			id: row.id,
			name: row.name,
			clientOrgId: row.clientOrgId
		}
	})

	return (
		<DataGrid columns={columns} rows={rows} columnBuffer={5} autoHeight={true} pageSize={5}/>
	)
}
