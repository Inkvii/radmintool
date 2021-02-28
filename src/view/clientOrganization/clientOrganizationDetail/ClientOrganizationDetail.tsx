import {useParams} from "react-router-dom"
import {Container} from "@material-ui/core";
import React from "react";
import BasicInfo from "./fragments/BasicInfo";

interface ParamTypes {
	id: string
}

export default function ClientOrganizationDetail() {
	// retrieves url params specified in route path
	const {id} = useParams<ParamTypes>();

	return (
		<div>
			<Container>
				<h1>Client organization detail of id {id}</h1>
				<BasicInfo id={parseInt(id)}/>
			</Container>
		</div>
	)
}
