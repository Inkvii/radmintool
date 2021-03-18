import './App.css'
import React, {useEffect} from "react"
import {CssBaseline, MuiThemeProvider} from "@material-ui/core"
import {BrowserRouter} from "react-router-dom"
import lightTheme from "theme/LightTheme"
import SecuredRoutes from "security/SecuredRoutes"
import {authenticationProvider} from "security/authentication"


export default function App() {

	useEffect(() => {
		console.log("Before storage")
		window.onstorage = () => {
			console.error("--------------- Something has changed within localstorage ----------------")
			if (!localStorage.getItem(authenticationProvider.authenticationTokenName)) {
				authenticationProvider.logout()
			}

		}
		console.log("After storage")
	}, [])


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

