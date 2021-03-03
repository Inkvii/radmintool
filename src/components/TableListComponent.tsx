import {useHistory} from "react-router-dom";
import {CellParams, ColDef, DataGrid, RowsProp} from "@material-ui/data-grid";
import {Button} from "@material-ui/core";


export interface MyHeader {
	id: string,
	displayName: string,
	linkPath?: string
}

interface Props {
	jsonHeaders: MyHeader[]
	jsonRows: RowsProp[],
}

export default function TableListComponent(props: Props) {
	const history = useHistory()

	// check for difference in header vs row length
	props.jsonRows.forEach(row => {
		if (Object.keys(row).length !== props.jsonHeaders.length) {
			throw new Error(`Row [${Object.entries(row)}] has different number of columns than header`)
		}
	})

	console.log(props.jsonRows)

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

	return (
		<DataGrid columns={columns} rows={props.jsonRows} columnBuffer={5} autoHeight={true} pageSize={5}/>
	)
}
