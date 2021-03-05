import {Route, Switch} from "react-router-dom";
import Home from "./view/pages/Home";
import ClientOrganizationListView from "./view/pages/clientOrganization/ClientOrganizationListView";
import ClientOrganizationDetail
	from "./view/pages/clientOrganization/clientOrganizationDetail/ClientOrganizationDetail";
import React from "react";
import MegaTableVIew from "./view/pages/MegaTableVIew";

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
