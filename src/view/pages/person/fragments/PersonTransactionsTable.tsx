import TableListComponent, {TableListComponentHeader} from "components/TableListComponent"
import {Transaction} from "BackendObjects"
import {RowsProp} from "@material-ui/data-grid"
import {Paper} from "@material-ui/core"

interface Props {
	transactions: Transaction[]
}

export default function PersonTransactionsTable(props: Props) {


	const headers: TableListComponentHeader[] = [
		{id: "id", displayName: "Transaction Id"},
		{id: "createdDateTime", displayName: "Created datetime"},
		{id: "amount", displayName: "Amount"},
	]


	return (
		<Paper style={{marginTop: 20}}>
			<TableListComponent jsonHeaders={headers} jsonRows={props.transactions as unknown as RowsProp[]}/>
		</Paper>
	)
}
