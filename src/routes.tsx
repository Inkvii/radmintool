import {Route, Switch} from "react-router-dom";
import Home from "./view/Home";
import ClientOrganizationListView from "./view/clientOrganization/ClientOrganizationListView";
import ClientOrganizationDetail from "./view/clientOrganization/clientOrganizationDetail/ClientOrganizationDetail";
import React from "react";
import MegaTableVIew from "./view/MegaTableVIew";

export const PATH_ROUTES = {
	"home": "/",
	"clientOrganizationListView": "/clientOrganization/list",
	"clientOrganization": "/clientOrganization",
	"megaTableView": "/megaTableView"
}

export default function DeclaredRoutes() {
	return (
		<Switch>
			<Route exact path={PATH_ROUTES.home} component={Home}/>
			<Route path={PATH_ROUTES.clientOrganizationListView} component={ClientOrganizationListView}/>
			<Route path={PATH_ROUTES.clientOrganization + "/:id"} component={ClientOrganizationDetail}/>
			<Route path={PATH_ROUTES.megaTableView} component={MegaTableVIew}/>
		</Switch>
	)
}
