import {useParams} from "react-router-dom"

export default function ClientOrganizationDetail() {

	// @ts-ignore
	let {id} = useParams();

	return (
		<div>
			<h1>Hello {id}</h1>
			<p>ASDADASDASDAS</p>
		</div>
	)
}
