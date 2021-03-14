import {Box, Button, Container, createStyles, makeStyles, Typography} from "@material-ui/core"
import {useHistory} from "react-router-dom"

export default function UnauthorizedPage() {
	const classes = useStyles()

	const history = useHistory()

	const handleGoBack = () => {
		history.goBack()
	}

	return (
		<Container>

			<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} className={classes.container}>

				<div className={classes.row}>
					<Typography variant={"h2"}>
						You do not have permission to view this page.
					</Typography>
				</div>
				<div className={classes.row}>
					<Button onClick={() => handleGoBack()} fullWidth>Go back</Button>
				</div>
			</Box>
		</Container>
	)
}


const useStyles = makeStyles(() => createStyles({
	container: {
		padding: 40,
	},
	row: {
		marginTop: 20
	}
}))
