import {Button, Container} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {authenticationProvider} from "security/authentication"
import {useAppDispatch} from "redux/hooks"
import {setLoggedIn} from "redux/ProfileSlice"

export default function Logout() {
	const history = useHistory()
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		authenticationProvider.logout()
		dispatch(setLoggedIn(false))
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
