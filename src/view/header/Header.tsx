import Menu from "components/menu/Menu"
import React from "react"
import headerTheme from "theme/HeaderTheme"
import {MuiThemeProvider} from "@material-ui/core"

export default function Header() {
	return (
		<MuiThemeProvider theme={headerTheme}>
			<Menu/>
		</MuiThemeProvider>
	)
}
