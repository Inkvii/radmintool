import {Button, Container, createStyles, makeStyles, Paper, TextField, Typography} from "@material-ui/core"
import {useAppDispatch} from "redux/hooks"
import {saveAuthenticationToken} from "redux/ProfileSlice"


export default function LoginPage() {
	const classes = useStyles()
	const dispatch = useAppDispatch()

	const handleSubmit = () => {
		console.info("Mocking login")
		dispatch(saveAuthenticationToken("Hello"))
	}

	return (
		<Container className={classes.login}>
			<Paper>

				<form className={classes.form} autoComplete={"none"} onSubmit={handleSubmit}>
					<Typography variant={"h4"} align={"center"}>Log in to rAdmin Tool</Typography>
					<TextField
						label="Email"
						id="email"
						fullWidth
						type="text"
						className={classes.textfield}
					/>
					<TextField
						label="Password"
						id="password"
						fullWidth
						type="password"
						className={classes.textfield}
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

