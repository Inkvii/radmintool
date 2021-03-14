import DeclaredRoutes from "routes"
import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {isTokenValid} from "security/authentication"

export default function SecuredRoutes() {
	const [shouldAllowUser, setShouldAllowUser] = useState<boolean>(false)
	const history = useHistory()


	const retrieveAuthenticationLogin = () => {
		const tokenValid = isTokenValid()
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
