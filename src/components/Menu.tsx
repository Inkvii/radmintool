import React from "react";
import {AppBar, Button, Grid, IconButton, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {PATH_ROUTES} from "../routes";
import {MenuIcon} from "@material-ui/data-grid";
import {AccountCircle} from "@material-ui/icons";
import SearchBar from "./SearchBar";


export default function Menu() {

	const createButtonLink = (props: { uri: string, displayName: string }) => {
		return (
			<Button color={"inherit"} component={Link} to={props.uri}>{props.displayName}</Button>
		)
	}

	return (
		<>
			<AppBar position={"static"} color={"primary"}>
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon/>
					</IconButton>
					<Grid container>
						<Grid item xs={6}>
							{createButtonLink(PATH_ROUTES.home)}
							{createButtonLink(PATH_ROUTES.clientOrganizationListView)}
							{createButtonLink(PATH_ROUTES.megaTableView)}
						</Grid>
						<Grid item xs>
							<SearchBar/>
						</Grid>
					</Grid>
					<IconButton edge={"end"} color={"inherit"}>
						<AccountCircle/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
}


