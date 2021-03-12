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
	"datagridTableView": {
		uri: "/datagridTableView",
		displayName: "Component of data grid",
		searchable: true
	},
	"reduxCounterExample": {
		uri: "/reduxCounter",
		displayName: "Redux counter",
		searchable: true
	},
	"profile": {
		uri: "/profile",
		displayName: "Profile",
		searchable: false
	},
	"logout": {
		uri: "/logout",
		displayName: "Logout",
		searchable: false
	},
	"index": {
		uri: "/index",
		displayName: "Index page",
		searchable: true
	}
}


export default function DeclaredRoutes() {
	return (
		<Switch>
			<Route exact path={PATH_ROUTES.home.uri} component={Home}/>
			<Route path={PATH_ROUTES.clientOrganizationListView.uri} component={ClientOrganizationListView}/>
			<Route path={PATH_ROUTES.clientOrganization.uri + "/:id"} component={ClientOrganizationDetail}/>
			<Route path={PATH_ROUTES.datagridTableView.uri} component={DatagridTableView}/>
			<Route path={PATH_ROUTES.reduxCounterExample.uri} component={ReduxCounterExample}/>
			<Route path={PATH_ROUTES.profile.uri} component={Profile}/>
			<Route path={PATH_ROUTES.logout.uri} component={Logout}/>
			<Route path={PATH_ROUTES.index.uri} component={Index}/>
		</Switch>
	)
}
