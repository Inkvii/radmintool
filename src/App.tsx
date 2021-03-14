import './App.css'
import React from "react"
import {CssBaseline, MuiThemeProvider} from "@material-ui/core"
import {BrowserRouter} from "react-router-dom"
import SecuredRoutes from "theme/LightTheme"


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

