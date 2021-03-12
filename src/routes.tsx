import {Route, Switch} from "react-router-dom"
import Home from "./view/pages/Home"
import ClientOrganizationListView from "./view/pages/clientOrganization/ClientOrganizationListView"
import ClientOrganizationDetail from "./view/pages/clientOrganization/clientOrganizationDetail/ClientOrganizationDetail"
import React from "react"
import DatagridTableView from "view/pages/DatagridTableView"
import ReduxCounterExample from "view/pages/ReduxCounterExample"
import Profile from "view/pages/Profile"
import Logout from "view/pages/Logout"
import Index from "view/pages/Index"


export class PathRouteHeaderInformation {
	uri: string
	searchable: boolean

	constructor(uri: string, searchable: boolean = true) {
		this.uri = uri
		this.searchable = searchable
	}
}

export class PathRouteReaderDescription {
	headerName: string
	shortDescription: string
	longDescription: string

	constructor(headerName: string, shortDescription: string, longDescription: string = "") {
		this.headerName = headerName
		this.shortDescription = shortDescription
		this.longDescription = longDescription
	}
}

export class PathRouteClass {
	headerInformation: PathRouteHeaderInformation
	readerDescription: PathRouteReaderDescription
	component: React.FunctionComponent


	constructor(headerInformation: PathRouteHeaderInformation, readerDescription: PathRouteReaderDescription, component: React.FunctionComponent) {
		this.headerInformation = headerInformation
		this.readerDescription = readerDescription
		this.component = component
	}
}


export const PATH_ROUTES = {
	"home": new PathRouteClass(
		new PathRouteHeaderInformation("/"),
		new PathRouteReaderDescription("Dashboard", "Page about day to day goings"),
		Home
	),
	"clientOrganizationListView": new PathRouteClass(
		new PathRouteHeaderInformation("/clientOrganizationListView"),
		new PathRouteReaderDescription("Custom client organization table list", "Page with table and all available client organizations we do have registered"),
		ClientOrganizationListView
	),
	"clientOrganization": new PathRouteClass(
		new PathRouteHeaderInformation("/clientOrganization", false),
		new PathRouteReaderDescription("Detail view of one client organization", "Detail view of one selected client organization"),
		ClientOrganizationDetail
	),
	"datagridTableView": new PathRouteClass(
		new PathRouteHeaderInformation("/datagridTableView"),
		new PathRouteReaderDescription("Component of data grid", "Data grid view of all people we have in our system"),
		DatagridTableView
	),
	"reduxCounterExample": new PathRouteClass(
		new PathRouteHeaderInformation("/reduxCounter"),
		new PathRouteReaderDescription("Redux counter", "Redux counter example"),
		ReduxCounterExample
	),
	"profile": new PathRouteClass(
		new PathRouteHeaderInformation("/profile", false),
		new PathRouteReaderDescription("User profile", "Profile settings and overview"),
		Profile
	),
	"logout": new PathRouteClass(
		new PathRouteHeaderInformation("/logout", false),
		new PathRouteReaderDescription("Logout", "Page that leads away from here"),
		Logout
	),
	"index": new PathRouteClass(
		new PathRouteHeaderInformation("/index"),
		new PathRouteReaderDescription("Index of all pages", "Page containing index of all searchable pages"),
		Index
	)
}


export default function DeclaredRoutes() {

	const createSimpleRoute = (pathRoute: PathRouteClass) => {
		return (<Route path={pathRoute.headerInformation.uri} component={pathRoute.component}/>)
	}

	return (
		<Switch>
			<Route exact path={PATH_ROUTES.home.headerInformation.uri} component={PATH_ROUTES.home.component}/>
			<Route exact path={PATH_ROUTES.clientOrganization.headerInformation.uri + "/:id"}
			       component={PATH_ROUTES.clientOrganization.component}/>
			{createSimpleRoute(PATH_ROUTES.clientOrganizationListView)}
			{createSimpleRoute(PATH_ROUTES.datagridTableView)}
			{createSimpleRoute(PATH_ROUTES.reduxCounterExample)}
			{createSimpleRoute(PATH_ROUTES.profile)}
			{createSimpleRoute(PATH_ROUTES.logout)}
			{createSimpleRoute(PATH_ROUTES.index)}

		</Switch>
	)
}
