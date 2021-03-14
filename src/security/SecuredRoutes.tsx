import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {isTokenValid, loadAuthenticationToken} from "security/authentication"
import DeclaredRoutes from "router/DeclaredRoutes"
import {Location} from "history"
import PathRouteClass, {PATH_ROUTES} from "router/routes"
import {AuthenticationToken} from "security/AuthenticationToken"


export default function SecuredRoutes() {
	const [tokenIsValid, setTokenIsValid] = useState<boolean>(false)
	const [userHasPermissionToViewPage, setUserHasPermissionToViewPage] = useState<boolean>(true)
	const history = useHistory()


	const checkAndRetrieveAuthenticationLogin = (): AuthenticationToken | null => {
		const token = loadAuthenticationToken()
		const tokenValid = isTokenValid(token)
		console.debug("Is token valid: " + tokenValid)
		setTokenIsValid(tokenValid)
		return token
	}

	const setIfUserCanViewPage = (location: Location<unknown>, token: AuthenticationToken | null) => {
		console.group("setIfUserCanViewPage")
		const route: PathRouteClass | undefined = Object.values(PATH_ROUTES).find(route => route.linkInfo.uri === location.pathname)
		if (route && token !== null) {
			console.debug("Route exists and token is valid")
			let isPermissionFound: boolean
			if (route.permissions.length > 0) {
				console.debug("Checking if user is allowed to view page " + location.pathname)
				isPermissionFound = token.permissions.every((value) => route.permissions.includes(value))
			} else {
				console.debug("Page has no permission restrictions")
				isPermissionFound = true
			}

			isPermissionFound ? console.debug("Permission is granted") : console.warn("Permission denied")
			setUserHasPermissionToViewPage(isPermissionFound)
		} else {
			setUserHasPermissionToViewPage(false)
		}
		console.groupEnd()
	}

	const accessRightsDecider = (location: Location) => {
		const token = checkAndRetrieveAuthenticationLogin()
		setIfUserCanViewPage(location, token)
	}

	/**
	 * Triggers when user first visits the page
	 */
	useEffect(() => {
		console.group("First time logging to application")
		console.info("Trying to access location " + history.location.pathname)
		accessRightsDecider(history.location)
		console.groupEnd()
	}, [])


	/**
	 * Triggers when browser changes url
	 */
	useEffect(() => {
		return history.listen((location) => {
			console.group("User's browser location changed")
			console.info("User's browser location changed. Checking if token is valid")
			accessRightsDecider(location)
			console.groupEnd()
		})
	}, [history])


	return (
		<DeclaredRoutes tokenIsValid={tokenIsValid} userHasPermissionToViewPage={userHasPermissionToViewPage}/>
	)
}
