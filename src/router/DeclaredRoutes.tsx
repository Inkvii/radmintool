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

export default function DeclaredRoutes(props: Props) {

	const createSimpleRoute = (pathRoute: PathRouteClass) => {
		return (<Route path={pathRoute.linkInfo.uri} component={pathRoute.component}/>)
	}

	if (!props.tokenIsValid) {
		console.info("Authentication token is empty. Showing login page")
		return <LoginPage/>
	}
	console.info("Authentication token is set, loading storage")

	if (!props.userHasPermissionToViewPage) {
		return <UnauthorizedPage/>
	}

	console.info("User has permission to view page")

	return (
		<>
			<Header/>
			<Switch>
				<Route exact path={PATH_ROUTES.home.linkInfo.uri} component={PATH_ROUTES.home.component}/>
				<Route exact path={PATH_ROUTES.clientOrganization.linkInfo.uri + "/:id"} component={PATH_ROUTES.clientOrganization.component}/>
				{createSimpleRoute(PATH_ROUTES.clientOrganizationListView)}
				{createSimpleRoute(PATH_ROUTES.datagridTableView)}
				{createSimpleRoute(PATH_ROUTES.reduxCounterExample)}
				{createSimpleRoute(PATH_ROUTES.profile)}
				{createSimpleRoute(PATH_ROUTES.logout)}
				{createSimpleRoute(PATH_ROUTES.index)}

			</Switch>
		</>
	)
}
