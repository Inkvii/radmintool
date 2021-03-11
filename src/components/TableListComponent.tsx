import {useHistory} from "react-router-dom"
import {CellParams, ColDef, DataGrid, RowsProp} from "@material-ui/data-grid"
import {Button} from "@material-ui/core"
import {useEffect} from "react"


export interface TableListComponentHeader {
	id: string,
	displayName: string,
	linkPath?: string
}

interface Props {
	jsonHeaders: TableListComponentHeader[]
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

	useEffect(() => {
		if (props.jsonRows.length > 0) {
			console.debug(props.jsonRows)
		}

	}, [props.jsonRows])


	const createButtonColumn = (field: string, headerName: string, linkToTarget: string) => {
		const clickableColumnType: ColDef = {
			field: field,
			headerName: headerName,
			sortable: true,
			flex: 1,
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
				headerName: header.displayName,
				flex: 1,

			}
		}
	})

	return (
		<DataGrid columns={columns} rows={props.jsonRows} columnBuffer={5} autoHeight={true} pageSize={5}/>
	)
}
