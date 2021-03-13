import {Button, Container} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import {useAppDispatch} from "redux/hooks"
import {setAuthenticationToken} from "redux/ProfileSlice"

export default function Logout() {
	const history = useHistory()
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		console.warn("Log out is complete")
		dispatch(setAuthenticationToken(""))
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
