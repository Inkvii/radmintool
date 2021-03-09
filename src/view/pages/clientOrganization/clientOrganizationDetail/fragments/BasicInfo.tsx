import {Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import {ClientOrganization} from "view/pages/clientOrganization/clientOrganizationDetail/interfaces"

interface Props {
	organization: ClientOrganization
}

export default function BasicInfo({organization}: Props) {

	return (
		<Card>
			<CardContent>
				<h2>Basic information about client organization {organization.externalClientOrganizationId}</h2>
				<TableContainer>
					<Table>
						<TableBody>
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
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	)
}
