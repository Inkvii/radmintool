import {Snackbar} from "@material-ui/core"
import {Alert} from "@material-ui/lab"


interface Props {
	shouldOpen: boolean,
	callbackAfterClosingAlert: Function,
	message: string,
	severity?: 'success' | 'info' | 'warning' | 'error'
	autoHideDuration?: number
}

/**
 * When user edits client organization this component is triggered. It is basically a notification that appears in bottom middle part
 * of window, informing user that something happened
 * @param props
 * @constructor
 */
export default function CustomSnackbar(props: Props) {

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		props.callbackAfterClosingAlert()
	}


	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			open={props.shouldOpen}
			autoHideDuration={props.autoHideDuration || 2000}
			onClose={handleClose}
		>
			<Alert variant={"filled"} severity={props.severity || "success"}>{props.message}</Alert>
		</Snackbar>
	)
}
