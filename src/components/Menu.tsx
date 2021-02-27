import React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import Home from "../view/Home";
import About from "../view/About";
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
		"about": "/about",
	}

	const tab_position = [
		PATH_ROUTES.home,
		PATH_ROUTES.about
	]

	return (
		<>
			<AppBar position={"static"}>
				<Tabs value={selectedTab} onChange={handleChange}>
					<Tab label={"Home"}/>
					<Tab label={"About"}/>
				</Tabs>
			</AppBar>

			<Switch>
				<Route exact path={PATH_ROUTES.home} component={Home}/>
				<Route path={PATH_ROUTES.about} component={About}/>

			</Switch>

		</>
	);


}
