import {Button, Container, createStyles, makeStyles, Paper, TextField, Theme, Typography} from "@material-ui/core"


export default function LoginPage() {
	const classes = useStyles()

	return (
		<Container className={classes.login}>
			<Paper>

				<form className={classes.form} autoComplete={"none"}>
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

						<Button type="button" color="primary" fullWidth className={classes.button}>
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


const useStyles = makeStyles((theme: Theme) => createStyles({

	login: {
		// textAlign: "center",
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

