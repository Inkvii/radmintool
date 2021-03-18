import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import DeclaredRoutes from "router/DeclaredRoutes"
import {Location} from "history"
import PathRouteClass, {PATH_ROUTES} from "router/routes"
import {AuthenticationToken} from "security/AuthenticationToken"
import {authenticationProvider} from "security/authentication"


export default function SecuredRoutes() {
	const [tokenIsValid, setTokenIsValid] = useState<boolean>(false)
	const [userHasPermissionToViewPage, setUserHasPermissionToViewPage] = useState<boolean>(true)
	const history = useHistory()

	const setIfUserCanViewPage = (location: Location<unknown>, token: AuthenticationToken | null) => {
		console.group("setIfUserCanViewPage")
		const route: PathRouteClass | undefined = Object.values(PATH_ROUTES).find(route => location.pathname.includes(route.linkInfo.uri))
		if (route && token !== null) {
			console.debug("Route exists and token is valid")
			let isPermissionFound: boolean
			if (route.permissions.length > 0) {
				console.debug("Checking if user is allowed to view page " + location.pathname)
				isPermissionFound = route.permissions.every((val) => token.permissions.includes(val))
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
		authenticationProvider.getAuthenticationToken().then(token => {
			console.debug("Is token valid: " + token !== null)
			setTokenIsValid(token !== null)
			setIfUserCanViewPage(location, token)
		})

	}

	/**
	 * Triggers when user first visits the page
	 */
	useEffect(() => {
		console.group("First time logging to application")
		console.info("Trying to access location " + history.location.pathname)
		accessRightsDecider(history.location)
		console.groupEnd()
		// eslint-disable-next-line
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
		// eslint-disable-next-line
	}, [history])


	return (
		<DeclaredRoutes tokenIsValid={tokenIsValid} userHasPermissionToViewPage={userHasPermissionToViewPage}/>
	)
}
