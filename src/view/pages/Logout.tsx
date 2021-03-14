import {Button, Container} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {setAuthenticationToken} from "security/authentication"

export default function Logout() {
	const history = useHistory()

	const handleLogout = () => {
		console.warn("Log out is complete")
		setAuthenticationToken(null)
		history.push("/")
	}

	return (
		<Container>
			<h1>Logout</h1>
			Are you sure?<br/>
			<Button onClick={() => handleLogout()}>Logout</Button>
		</Container>
	)
}
