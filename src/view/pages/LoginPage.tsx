import {Box, Button, Container, createStyles, makeStyles, Paper, TextField, Typography} from "@material-ui/core"
import {setAuthenticationToken} from "security/authentication"
import {AuthenticationToken, Permission} from "security/AuthenticationToken"
import {useHistory} from "react-router-dom"


export default function LoginPage() {
	const classes = useStyles()
	const history = useHistory()

	/**
	 * This is workaround for triggering history change after token is loaded since we dont have listener on local storage
	 * @param event event to be ignored
	 */
	const refreshPage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.debug("Refreshing page")
		history.push(history.location)
	}

	/**
	 * Handles setting token based on user input
	 * @param useAdmin true = uses admin which has all permissions
	 */
	const handleSubmit = (useAdmin: boolean = false) => {
		console.info("Mocking login")
		let token: AuthenticationToken
		if (useAdmin) {
			token = mockAdminRole()
		} else {
			token = mockRegularUserRole()
		}
		setAuthenticationToken(token)
	}

	const mockAdminRole = (): AuthenticationToken => {
		return {
			token: "Big bad admin",
			permissions: Object.keys(Permission).map(key => Permission[key as any]).map(value => value as unknown as Permission),
			expires: new Date().getTime() + (8 * 60 * 60 * 1000), //expires in 8 hours
			issued: new Date().getTime()
		}
	}
	const mockRegularUserRole = (): AuthenticationToken => {
		return {
			token: "hello there",
			permissions: [
				Permission.REDUX_COUNTER
			],
			expires: new Date().getTime() + (8 * 60 * 60 * 1000), //expires in 8 hours
			issued: new Date().getTime()
		}
	}

	return (
		<Container className={classes.login}>
			<Paper>

				<form className={classes.form} onSubmit={(event) => refreshPage(event)}>
					<Typography variant={"h4"} align={"center"}>Log in to rAdmin Tool</Typography>
					<TextField
						label="Email"
						id="email"
						fullWidth
						type="text"
						className={classes.textfield}
						autoComplete={"username"}
					/>
					<TextField
						label="Password"
						id="password"
						fullWidth
						type="password"
						className={classes.textfield}
						autoComplete={"current-password"}
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
				<form onSubmit={(event) => refreshPage(event)}>

					<Box display={"flex"} flexDirection={"column"} style={{padding: 10}}>
						<Button type={"submit"} variant={"contained"} onClick={(() => handleSubmit(true))}>Use admin role</Button>
						<Button type={"submit"} variant={"outlined"} color={"secondary"} onClick={(() => handleSubmit(false))}>Use regular role</Button>
					</Box>
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

