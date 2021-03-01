import React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import DeclaredRoutes, {PATH_ROUTES} from "../routes";


export default function Menu() {
	const [selectedTab, setSelectedTab] = React.useState(0);
	const history = useHistory();

	const handleChange = (event: any, newValue: number) => {
		setSelectedTab(newValue);
		history.push(tab_position[newValue])
	}

	const tab_position = [
		PATH_ROUTES.home,
		PATH_ROUTES.clientOrganizationListView,
		PATH_ROUTES.megaTableView
	]

	return (
		<>
			<AppBar position={"static"}>
				<Tabs value={selectedTab} onChange={handleChange}>
					<Tab label={"Home"}/>
					<Tab label={"Client organization list"}/>
					<Tab label={"Mega table view"}/>
				</Tabs>
			</AppBar>

			<DeclaredRoutes/>

		</>
	);


}
