import {Card, CardContent, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {useEffect, useState} from "react";
import loadClientOrganizationList from "../../../../db/DatabaseConnector";

interface Props {
	id: number
}

interface ClientOrganization {
	"id": number,
	"clientOrganizationName": string,
	"doingBusinessAs": string,
	"externalClientOrganizationId": string
}

export default function BasicInfo({id}: Props) {

	const [organization, setOrganization] = useState<ClientOrganization>({
		id: 0,
		clientOrganizationName: "",
		externalClientOrganizationId: "",
		doingBusinessAs: ""
	})

	useEffect(() => {
		const fetchMyPromise = async () => {
			const promise: ClientOrganization = await fetchClientOrganization(id)
			console.log("Promise is retrieved " + promise)
			setOrganization(promise)
		}
		fetchMyPromise()
	}, [id])


	return (
		<Card>
			<CardContent>
				<h2>Basic information about client organization {organization.clientOrganizationName}</h2>
				<TableContainer>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>{organization.id}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Doing business as</TableCell>
						<TableCell>{organization.doingBusinessAs}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>External client organization id</TableCell>
						<TableCell>{organization.externalClientOrganizationId}</TableCell>
					</TableRow>

				</TableContainer>
			</CardContent>
		</Card>
	)
}


async function fetchClientOrganization(id: number): Promise<ClientOrganization> {
	console.log("Starting to fetch row")
	// Im lazy to create a server so just mock it from list and filter it
	const jsonArray: any = await loadClientOrganizationList(1000, 0)
	console.log("Json is loaded: " + jsonArray)
	return jsonArray.find((organization: ClientOrganization) => organization.id === id)
}
