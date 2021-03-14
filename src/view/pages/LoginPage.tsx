import {Button, Container, createStyles, makeStyles, Paper, TextField, Typography} from "@material-ui/core"
import {setAuthenticationToken} from "security/authentication"
import {AuthenticationToken, Permission} from "security/AuthenticationToken"


export default function LoginPage() {
	const classes = useStyles()


	const handleSubmit = () => {
		console.info("Mocking login")
		const token: AuthenticationToken = {
			token: "hello there",
			permissions: [
				Permission.REDUX_COUNTER
			],
			expires: new Date().getTime() + (8 * 60 * 60 * 1000), //expires in 8 hours
			issued: new Date().getTime()
		}
		setAuthenticationToken(token)
	}

	return (
		<Container className={classes.login}>
			<Paper>

				<form className={classes.form} onSubmit={handleSubmit}>
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

