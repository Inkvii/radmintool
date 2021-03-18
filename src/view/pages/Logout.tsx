import {Button, Container} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {authenticationProvider} from "security/authentication"

export default function Logout() {
	const history = useHistory()

	const handleLogout = () => {
		authenticationProvider.logout()
		history.push("/")
		console.warn("Log out is complete")
	}

	return (
		<Container>
			<h1>Logout</h1>
			Are you sure?<br/>
			<Button onClick={() => handleLogout()}>Logout</Button>
		</Container>
	)
}
