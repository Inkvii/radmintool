import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core'
import {red} from "@material-ui/core/colors"


const headerTheme = createMuiTheme({
		palette: {
			primary: {
				main: red["900"],
				light: red["700"]
			},
			secondary: {
				main: red[700]
			},
			contrastThreshold: 3,
			tonalOffset: 0.2
		},
		overrides: {
			MuiInput: {
				root: {
					color: "#d20cd2",
					paddingLeft: 10
				}
			},
			MuiInputBase: {
				input: {
					color: "#FFF"
				}
			},
			MuiOutlinedInput: {
				root: {
					backgroundColor: red["700"],
				},
				notchedOutline: {
					border: "none"
				}
			}
		}
	}
)


export default headerTheme

