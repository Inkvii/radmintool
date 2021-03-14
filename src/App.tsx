import './App.css'
import React from "react"
import {CssBaseline, MuiThemeProvider} from "@material-ui/core"
import {BrowserRouter} from "react-router-dom"
import lightTheme from "theme/LightTheme"
import SecuredRoutes from "security/SecuredRoutes"


export default function App() {
	return (
		<div>
			<CssBaseline/>
			<BrowserRouter>
				<MuiThemeProvider theme={lightTheme}>
					<SecuredRoutes/>
				</MuiThemeProvider>
			</BrowserRouter>
		</div>
	)
}

