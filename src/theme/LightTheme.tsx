import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core'
import {blue, red} from "@material-ui/core/colors"

const lightTheme = createMuiTheme({
	palette: {
		primary: {
			main: blue["700"],
		},
		secondary: {
			main: blue["300"]
		},
		error: {
			main: red["700"]
		},
		contrastThreshold: 3,
		tonalOffset: 0.2
	}
})

export default lightTheme
