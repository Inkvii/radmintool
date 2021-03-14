import DeclaredRoutes from "routes"
import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {loadAuthenticationToken} from "security/authentication"

export default function SecuredRoutes() {
	const [shouldAllowUser, setShouldAllowUser] = useState<boolean>(false)
	const history = useHistory()

	const isTokenValid = (token: string) => {
		return token !== undefined && token !== null && token !== ""
	}

	const retrieveAuthenticationLogin = () => {
		const token = loadAuthenticationToken()
		console.debug("Token loaded: " + token)
		const tokenValid = isTokenValid(token)
		console.debug("Is token valid: " + tokenValid)
		setShouldAllowUser(tokenValid)
	}

	useEffect(() => {
		retrieveAuthenticationLogin()
	}, [])


	useEffect(() => {
		return history.listen((location) => {

			console.group("History changed")
			console.info("History has changed. Something can be done here")
			console.log("Location:", location.pathname)
			retrieveAuthenticationLogin()
			console.groupEnd()

		})
	}, [history])


	return (
		<DeclaredRoutes shouldAllowUser={shouldAllowUser}/>
	)
}
