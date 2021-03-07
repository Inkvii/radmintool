import {createMuiTheme} from "@material-ui/core"
import {blue} from "@material-ui/core/colors"

const lightTheme = createMuiTheme({
	palette: {
		primary: {
			main: blue["700"],
		},
		secondary: {
			main: blue["300"]
		},
		contrastThreshold: 3,
		tonalOffset: 0.2
	}
})

export default lightTheme
