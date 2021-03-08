import {Route, Switch} from "react-router-dom"
import Home from "./view/pages/Home"
import ClientOrganizationListView from "./view/pages/clientOrganization/ClientOrganizationListView"
import ClientOrganizationDetail from "./view/pages/clientOrganization/clientOrganizationDetail/ClientOrganizationDetail"
import React from "react"
import MegaTableVIew from "./view/pages/MegaTableVIew"
import ReduxCounterExample from "view/pages/ReduxCounterExample"

export type PathRoute = {
	uri: string,
	displayName: string,
	searchable: boolean
}

export const PATH_ROUTES = {
	"home": {
		uri: "/",
		displayName: "Dashboard",
		searchable: true
	},
	"clientOrganizationListView": {
		uri: "/clientOrganization/list",
		displayName: "Client organizations",
		searchable: true
	},
	"clientOrganization": {
		uri: "/clientOrganization",
		displayName: "Detail view of one client organization",
		searchable: false
	},
	"megaTableView": {
		uri: "/megaTableView",
		displayName: "Component of data grid",
		searchable: true
	},
	"reduxCounterExample": {
		uri: "/reduxCounter",
		displayName: "Redux counter",
		searchable: true
	}
}


export default function DeclaredRoutes() {
	return (
		<Switch>
			<Route exact path={PATH_ROUTES.home.uri} component={Home}/>
			<Route path={PATH_ROUTES.clientOrganizationListView.uri} component={ClientOrganizationListView}/>
			<Route path={PATH_ROUTES.clientOrganization.uri + "/:id"} component={ClientOrganizationDetail}/>
			<Route path={PATH_ROUTES.megaTableView.uri} component={MegaTableVIew}/>
			<Route path={PATH_ROUTES.reduxCounterExample.uri} component={ReduxCounterExample}/>
		</Switch>
	)
}
