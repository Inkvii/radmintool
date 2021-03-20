import {Route, Switch} from "react-router-dom"
import LoginPage from "view/pages/LoginPage"
import UnauthorizedPage from "view/pages/UnauthorizedPage"
import Header from "view/header/Header"
import React from "react"
import PathRouteClass, {PATH_ROUTES} from "router/routes"

interface Props {
	tokenIsValid: boolean
	userHasPermissionToViewPage: boolean
}

/**
 * Component containing all available paths. If path is not in the routes, user wont be able to get there.
 * By the definition of react-router-dom Switch - it returns first path that matches the URI.
 * @param props
 * @constructor
 */
export default function DeclaredRoutes(props: Props) {
	/**
	 * Helper method for creating route
	 * @param pathRoute
	 */
	const createSimpleRoute = (pathRoute: PathRouteClass) => {
		return (<Route path={pathRoute.linkInfo.uri} component={pathRoute.component}/>)
	}

	/**
	 * Security method that prevents user from accessing pages if they have no/invalid token.
	 * If triggered, will show login page (but wont redirect user)
	 */
	if (!props.tokenIsValid) {
		console.info("Authentication token is empty. Showing login page")
		return <LoginPage/>
	}
	console.info("Authentication token is set, loading storage")

	/**
	 * Security method that prevents user from accessing pages they dont have permission to view.
	 * Permissions for viewing page are declared in PATH_ROUTES and must match permissions that are on the token
	 */
	if (!props.userHasPermissionToViewPage) {
		return <UnauthorizedPage/>
	}

	console.info("User has permission to view page")

	return (
		<>
			<Header/>
			<Switch>
				<Route exact path={PATH_ROUTES.dashboard.linkInfo.uri} component={PATH_ROUTES.dashboard.component}/>
				<Route exact path={PATH_ROUTES.clientOrganization.linkInfo.uri + "/:id"} component={PATH_ROUTES.clientOrganization.component}/>
				<Route exact path={PATH_ROUTES.person.linkInfo.uri + "/:id"} component={PATH_ROUTES.person.component}/>
				{createSimpleRoute(PATH_ROUTES.clientOrganizationListView)}
				{createSimpleRoute(PATH_ROUTES.datagridTableView)}
				{createSimpleRoute(PATH_ROUTES.reduxCounterExample)}
				{createSimpleRoute(PATH_ROUTES.profile)}
				{createSimpleRoute(PATH_ROUTES.logout)}
				{createSimpleRoute(PATH_ROUTES.index)}
				{createSimpleRoute(PATH_ROUTES.restrictedPage)}


			</Switch>
		</>
	)
}
