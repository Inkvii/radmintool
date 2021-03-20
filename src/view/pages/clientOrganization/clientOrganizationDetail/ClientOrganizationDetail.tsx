import {useParams} from "react-router-dom"
import {Container} from "@material-ui/core"
import React, {useEffect} from "react"
import BasicInfo from "view/pages/clientOrganization/clientOrganizationDetail/fragments/BasicInfo"
import PartyProperties from "view/pages/clientOrganization/clientOrganizationDetail/fragments/PartyProperties"
import {useAppDispatch, useAppSelector} from "redux/hooks"
import {fetchClientOrganizationById} from "redux/ClientOrganizationSlice"
import {ClientOrganization} from "BackendObjects"

interface ParamTypes {
	id: string
}

export default function ClientOrganizationDetail() {
	// retrieves url params specified in route path
	const {id} = useParams<ParamTypes>()
	const currentClientOrganization: ClientOrganization = useAppSelector((state) => state.clientOrganization.currentClientOrganization)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (currentClientOrganization?.id !== parseInt(id)) {
			console.debug("Dispatching ids")

			dispatch(fetchClientOrganizationById(id))
		}
	})

	return (
		<div>
			<Container>
				<h1>Client organization detail of id {id}</h1>
				<BasicInfo organization={currentClientOrganization}/>
				<PartyProperties partyProperties={currentClientOrganization.partyProperties}/>
			</Container>
		</div>
	)
}
