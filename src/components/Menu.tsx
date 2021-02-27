import React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import Home from "../view/Home";
import ClientOrganizationListView from "../view/ClientOrganizationListView";
import {Route, Switch, useHistory} from "react-router-dom";


export default function Menu() {
	const [selectedTab, setSelectedTab] = React.useState(0);
	const history = useHistory();

	const handleChange = (event: any, newValue: number) => {
		setSelectedTab(newValue);
		history.push(tab_position[newValue])
	}

	const PATH_ROUTES = {
		"home": "/",
		"clientOrganizationListView": "/clientOrganization/list",
	}

	const tab_position = [
		PATH_ROUTES.home,
		PATH_ROUTES.clientOrganizationListView
	]

	return (
		<>
			<AppBar position={"static"}>
				<Tabs value={selectedTab} onChange={handleChange}>
					<Tab label={"Home"}/>
					<Tab label={"Client organization list"}/>
				</Tabs>
			</AppBar>

			<Switch>
				<Route exact path={PATH_ROUTES.home} component={Home}/>
				<Route path={PATH_ROUTES.clientOrganizationListView} component={ClientOrganizationListView}/>

			</Switch>

		</>
	);


}
