import Menu from "../../components/Menu";
import {MuiThemeProvider} from "@material-ui/core";
import theme from "../../theme/HeaderTheme";

export default function Header() {
	return (
		<MuiThemeProvider theme={theme}>
			<Menu/>
		</MuiThemeProvider>
	)
}
