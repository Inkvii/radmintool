import './App.css'
import React from "react"
import Header from "./view/header/Header"
import {CssBaseline, MuiThemeProvider} from "@material-ui/core"
import {BrowserRouter} from "react-router-dom"
import DeclaredRoutes from "./routes"
import lightTheme from "theme/LightTheme"


export default function App() {
	return (
		<div>
			<CssBaseline/>
			<BrowserRouter>
				<MuiThemeProvider theme={lightTheme}>
					<Header/>

					<DeclaredRoutes/>
				</MuiThemeProvider>
			</BrowserRouter>
		</div>
	)
}

