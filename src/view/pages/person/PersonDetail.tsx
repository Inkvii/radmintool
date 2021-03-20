import {useHistory, useParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "redux/hooks"
import {useEffect} from "react"
import {fetchPersonById} from "redux/PersonSlice"
import {Button, Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import {PATH_ROUTES} from "router/routes"
import {Person} from "BackendObjects"
import PersonTransactionsTable from "view/pages/person/fragments/PersonTransactionsTable"

interface ParamTypes {
	id: string
}

export default function PersonDetail() {
	const {id} = useParams<ParamTypes>()
	const currentPerson: Person = useAppSelector((state) => state.person.currentPerson)
	const dispatch = useAppDispatch()
	const history = useHistory()


	useEffect(() => {
		if (currentPerson?.id !== parseInt(id)) {
			console.debug("Dispatching ids")

			dispatch(fetchPersonById(id))
		}
	})


	const createTableRow = (name: string, value: string, link?: string) => (
		<TableRow>
			<TableCell align={"left"} style={{width: "50%"}} variant={"head"}>{name}</TableCell>
			<TableCell align={"left"} style={{width: "50%"}} variant={"head"}>
				{link && <Button variant="outlined" onClick={() => history.push(link)}>{value}</Button>}
				{!link && value}

			</TableCell>
		</TableRow>
	)

	return (
		<Container style={{marginTop: 20}}>
			<Card>
				<CardContent>
					<h2>Basic information about person {currentPerson.id}</h2>
					<TableContainer>
						<Table>
							<TableBody>
								{createTableRow("Id", currentPerson.id?.toString())}
								{createTableRow("First name", currentPerson.firstName)}
								{createTableRow("Last name", currentPerson.lastName)}
								{createTableRow("Age", currentPerson.age?.toString())}
								{createTableRow("Client organization id", currentPerson.clientOrganizationReference?.toString(), PATH_ROUTES.clientOrganization.linkInfo.uri + "/" + currentPerson.clientOrganizationReference?.toString())}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>

			<PersonTransactionsTable transactions={currentPerson.transactionHistory}/>
		</Container>
	)
}
