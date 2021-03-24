import {Box, Container, Paper} from "@material-ui/core"
import Filter from "view/pages/longtable/fragment/Filter"
import {useEffect, useState} from "react"
import axios from "axios"
import {ColDef, DataGrid, RowsProp} from "@material-ui/data-grid"


interface FilterTransaction {
	filter: {},
	showOnFilterDemandOnly: boolean
}


interface RawBackendData {
	data: Object[],
	totalCount: number,
	totalPages?: number
}


export default function AllTransactionsPage() {

	const [headers, setHeaders] = useState<string[]>([])
	const [selectedFilterParams, setSelectedFilterParams] = useState({})

	useEffect(() => {
		axios.get("http://localhost:8080/transactions/longTransactions", {headers: {"Content-Type": "application/json"}})
			.then(result => {
				let head: string[] = []

				const data: FilterTransaction = result.data

				Object.keys(data.filter).forEach(header => {
					head.push(header)
				})
				setHeaders(head)
			})
	}, [])


	const triggerFilter = (filterHeaders: {}) => {
		console.info("Trigger filtering according to: " + JSON.stringify(filterHeaders))
		setSelectedFilterParams(filterHeaders)
	}

	return (
		<Container>
			<Filter headers={headers} triggerFilterCallback={triggerFilter}/>
			<LongTable selectedFilterParams={selectedFilterParams} urlPage={"http://localhost:8080/transactions/longTransactions"}/>
		</Container>
	)
}

interface Props {
	selectedFilterParams: {},
	urlPage: string
}

function LongTable(props: Props) {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)
	const [dataRows, setDataRows] = useState<RowsProp[]>([])
	const [dataHeaders, setDataHeaders] = useState<ColDef[]>([])
	const [totalRowCount, setTotalRowCount] = useState(0)

	const handleOnPageChange = (params: any) => {
		console.log("Params on handle page change")
		setPage(params.page)
	}


	const getDataFromBackend = async () => {

		const payload = {
			filter: props.selectedFilterParams,
			pageIndex: page
		}

		return axios.post(props.urlPage, payload, {headers: {"Content-Type": "application/json"}})
			.then(result => {
				const response: RawBackendData = result.data
				return response
			})

	}


	useEffect(() => {
		console.log("I am called")

		let active: boolean = true;

		(async () => {
			setLoading(true)
			const newRows: RawBackendData = await getDataFromBackend()
			console.log("New rows awaited")
			if (!active) {
				return
			}

			console.log("Setting up headers")
			if (newRows.data[0]) {

				const headerMap = Object.keys(newRows.data[0]).map((key, index) => {
					return {
						type: "string",
						field: key,
						headerName: key,
						flex: 1,
					} as ColDef
				})
				setDataHeaders(headerMap)
			}


			console.log("Setting things to state")
			setTotalRowCount(newRows.totalCount)
			setDataRows(newRows.data as RowsProp[])
			setLoading(false)
		})()

		return () => {
			active = false
		}
	}, [props.selectedFilterParams, page])

	return (

		<Paper>
			<Box padding={2} margin={1}>

				<h2>long table</h2>

				<DataGrid
					columns={dataHeaders}
					rows={dataRows}
					columnBuffer={3}
					autoHeight={true}
					pageSize={100}
					pagination
					rowCount={totalRowCount}
					paginationMode={"server"}
					onPageChange={handleOnPageChange}
					loading={loading}
					density={"compact"}
				/>
			</Box>
		</Paper>
	)
}
