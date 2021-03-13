import {Button, Container} from "@material-ui/core"
import {useAppDispatch} from "redux/hooks"
import {saveAuthenticationToken} from "redux/ProfileSlice"

export default function Logout() {
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		console.warn("Log out is complete")
		dispatch(saveAuthenticationToken(""))
	}

	return (
		<Container>
			<h1>Logout</h1>
			Are you sure?<br/>
			<Button onClick={() => handleLogout()}>Logout</Button>
		</Container>
	)
}
