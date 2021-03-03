import {useHistory} from "react-router-dom";
import {CellParams, ColDef, DataGrid, RowsProp} from "@material-ui/data-grid";
import {Button} from "@material-ui/core";


interface MyHeader {
	id: string,
	displayName: string,
	linkPath?: string
}

interface MyRow {
	id: string | number,
	name: string,
	clientOrgId: number
}

interface Props {
	jsonHeaders: MyHeader[]
	jsonRows: MyRow[],
}

export default function TableListComponent(props: Props) {
	const history = useHistory()

	const createButtonColumn = (field: string, headerName: string, linkToTarget: string) => {
		const clickableColumnType: ColDef = {
			field: field,
			headerName: headerName,
			sortable: true,
			// width: 300,

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

	const columns: ColDef[] = props.jsonHeaders.map(header => {

		if (header.linkPath !== undefined) {
			return createButtonColumn(header.id, header.displayName, header.linkPath)
		} else {
			return {
				type: "string",
				field: header.id,
				headerName: header.displayName
			}
		}
	})

	const rows: RowsProp = props.jsonRows.map(row => {
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
