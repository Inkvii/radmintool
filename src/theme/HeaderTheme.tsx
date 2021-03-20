import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core'
import {red} from "@material-ui/core/colors"

/**
 * Material UI's way of creating global way of theming. This is an example of un-extended theme
 *
 * Contains overrides that changes default look and feel of the Mui css classes.
 * NOTE: This is not the same as props theming
 */
const headerTheme = createMuiTheme({
		palette: {
			primary: {
				main: red["900"],
			},
			secondary: {
				main: red[700]
			},
			contrastThreshold: 3,
			tonalOffset: 0.1
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
					backgroundColor: red[700],
				},
				notchedOutline: {
					border: "none"
				}
			}
		}
	}
)


export default headerTheme

