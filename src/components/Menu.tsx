import React from "react";
import {AppBar, Button, IconButton, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {PATH_ROUTES} from "../routes";
import {MenuIcon} from "@material-ui/data-grid";


export default function Menu() {

	const createButtonLink = (route: string, name: string) => {
		return (
			<Button color={"inherit"} component={Link} to={route}>{name}</Button>
		)
	}

	return (
		<>
			<AppBar position={"static"}>
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon/>
					</IconButton>
					{createButtonLink(PATH_ROUTES.home, "Home")}
					{createButtonLink(PATH_ROUTES.clientOrganizationListView, "Client organization list view")}
					{createButtonLink(PATH_ROUTES.megaTableView, "Mega table view")}
				</Toolbar>
			</AppBar>
		</>
	);


}
