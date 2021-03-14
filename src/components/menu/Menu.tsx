import React from "react"
import {AppBar, Button, Grid, IconButton, Toolbar} from "@material-ui/core"
import {Link} from "react-router-dom"
import PathRouteClass, {PATH_ROUTES} from "router/routes"
import {MenuIcon} from "@material-ui/data-grid"
import SearchBar from "components/SearchBar"
import ProfileButton from "components/menu/ProfileButton"


export default function Menu() {
	const createButtonLink = (props: PathRouteClass) => {
		return (
			<Button color={"inherit"} component={Link} to={props.linkInfo.uri}>{props.description.headerName}</Button>
		)
	}

	return (
		<AppBar position={"static"} color={"primary"}>
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<MenuIcon/>
				</IconButton>
				<Grid container>
					<Grid item xs={12} sm={6}>
						{createButtonLink(PATH_ROUTES.home)}
						{createButtonLink(PATH_ROUTES.index)}
					</Grid>
					<Grid item xs={12} sm={6}>
						<SearchBar/>
					</Grid>
				</Grid>
				<ProfileButton/>
			</Toolbar>
		</AppBar>
	)
}


