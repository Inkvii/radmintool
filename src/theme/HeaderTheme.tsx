import {createMuiTheme} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#ac0d0d"
			},
			secondary: {
				main: red[700]
			},
			contrastThreshold: 3,
			tonalOffset: 0.2
		}
	}
)

export default theme;
