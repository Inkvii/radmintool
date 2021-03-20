import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import DeclaredRoutes from "router/DeclaredRoutes"
import {Location} from "history"
import PathRouteClass, {PATH_ROUTES} from "router/routes"
import {authenticationProvider} from "security/authentication"
import {AuthenticationToken} from "BackendObjects"

/**
 * Handles security routing based on token. Checks if token exists, is valid and user has permission to view the page.
 * This state is then handled to DeclaredRoutes that will actually show the page
 * @constructor
 */
export default function SecuredRoutes() {
	const [tokenIsValid, setTokenIsValid] = useState<boolean>(false)
	const [userHasPermissionToViewPage, setUserHasPermissionToViewPage] = useState<boolean>(true)
	const history = useHistory()

	/**
	 * Triggers (only once) when user first visits the page
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


	/**
	 * Method sets permission to view page.
	 * Method firstly checks if token exists (token is always valid here) and decides if page has any permissions.
	 * If page needs permission, method checks provided token if it contains the permission.
	 *
	 * In case that route has no permissions, no checks are made against token.
	 * @param location new location that user wants to visit
	 * @param token token for checking permissions against the page user wants to visit
	 */
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

	/**
	 * Method checks that user has valid token
	 * @param location new location user wants to visit
	 */
	const accessRightsDecider = (location: Location) => {
		authenticationProvider.getAuthenticationToken().then(token => {
			console.debug("Is token valid: " + token !== null)
			setTokenIsValid(token !== null)
			setIfUserCanViewPage(location, token)
		})
	}

	return (
		<DeclaredRoutes tokenIsValid={tokenIsValid} userHasPermissionToViewPage={userHasPermissionToViewPage}/>
	)
}
