import {Route, Switch} from "react-router-dom";
import Home from "./view/Home";
import ClientOrganizationListView from "./view/ClientOrganizationListView";
import ClientOrganizationDetail from "./view/ClientOrganizationDetail";
import React from "react";

export const PATH_ROUTES = {
	"home": "/",
	"clientOrganizationListView": "/clientOrganization/list",
	"clientOrganization": "/clientOrganization"
}

export default function DeclaredRoutes() {
	return (
		<Switch>
			<Route exact path={PATH_ROUTES.home} component={Home}/>
			<Route path={PATH_ROUTES.clientOrganizationListView} component={ClientOrganizationListView}/>
			<Route path={PATH_ROUTES.clientOrganization + "/:id"} component={ClientOrganizationDetail}/>
		</Switch>
	)
}
