import {Button, Container, createStyles, makeStyles, Paper, TextField, Typography} from "@material-ui/core"
import {authenticationProvider} from "security/authentication"
import {useHistory} from "react-router-dom"
import {useState} from "react"


export default function LoginPage() {

	const [username, setUsername] = useState<string>("admin")
	const [password, setPassword] = useState<string>("password")

	const classes = useStyles()
	const history = useHistory()

	/**
	 * This is workaround for triggering history change after token is loaded since listener on local storage is triggered
	 * only from different window
	 * @param event event to be ignored
	 */
	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		authenticationProvider.requestNewTokenFromBackend({username, password})
			.then(() => {
				console.debug("Refreshing page")
				history.push(history.location)
			}).catch(error => {
			console.error("Could not login " + error)
		})


	}

	return (
		<Container className={classes.login}>
			<Paper>

				<form className={classes.form} onSubmit={(event) => handleLogin(event)}>
					<Typography variant={"h4"} align={"center"}>Log in to rAdmin Tool</Typography>
					<TextField
						label="Email"
						id="email"
						fullWidth
						type="text"
						className={classes.textfield}
						autoComplete={"username"}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						label="Password"
						id="password"
						fullWidth
						type="password"
						className={classes.textfield}
						autoComplete={"current-password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className={classes.buttonGroup}>

						<Button type="submit" color="primary" fullWidth className={classes.button}>
							Log in
						</Button>
						<Button type="button" color="primary" disabled={true} fullWidth className={classes.button}>
							Register
						</Button>
					</div>
				</form>
			</Paper>
		</Container>
	)
}


const useStyles = makeStyles(() => createStyles({

	login: {
		maxWidth: "500px",
		minWidth: "300px",
		marginTop: "10%"
	},
	form: {
		display: "flex",
		flexDirection: "column",
		padding: 40
	},


	textfield: {
		marginTop: "5px"
	},

	button: {
		margin: "0px 10px",
	},

	buttonGroup: {
		display: "flex",
		flexDirection: "row",
		marginTop: "50px",
	}


}))

