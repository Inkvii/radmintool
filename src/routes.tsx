import {Route, Switch} from "react-router-dom"
import Home from "./view/pages/Home"
import ClientOrganizationListView from "./view/pages/clientOrganization/ClientOrganizationListView"
import ClientOrganizationDetail from "./view/pages/clientOrganization/clientOrganizationDetail/ClientOrganizationDetail"
import React, {useEffect, useState} from "react"
import DatagridTableView from "view/pages/DatagridTableView"
import ReduxCounterExample from "view/pages/ReduxCounterExample"
import Profile from "view/pages/Profile"
import Logout from "view/pages/Logout"
import IndexPage from "view/pages/index/IndexPage"
import LoginPage from "view/pages/LoginPage"
import Header from "view/header/Header"
import {useAppDispatch, useAppSelector} from "redux/hooks"
import {loadAuthenticationToken} from "redux/ProfileSlice"


export class LinkInfo {
	uri: string
	searchable: boolean

	constructor(uri: string, searchable: boolean = true) {
		this.uri = uri
		this.searchable = searchable
	}
}

export class RouteDescription {
	headerName: string
	shortDescription: string
	longDescription: string

	constructor(headerName: string, shortDescription: string, longDescription: string = "") {
		this.headerName = headerName
		this.shortDescription = shortDescription
		this.longDescription = longDescription
	}
}

export enum RouteGroupEnum {
	DASHBOARD = "Dashboard",
	TABLES = "Tables",
	OTHER = "Other"
}

export class PathRouteClass {
	linkInfo: LinkInfo
	description: RouteDescription
	component: React.FunctionComponent
	group: RouteGroupEnum


	constructor(linkInfo: LinkInfo, description: RouteDescription, component: React.FunctionComponent, group: RouteGroupEnum = RouteGroupEnum.OTHER) {
		this.linkInfo = linkInfo
		this.description = description
		this.component = component
		this.group = group
	}
}


export const PATH_ROUTES = {
	"home": new PathRouteClass(
		new LinkInfo("/"),
		new RouteDescription("Dashboard", "Page about day to day goings", "Dashboard is considered as one quick overview over day to day happenings, monitoring key performance indicators, seeing all important activity on one place without need for clicking oneself to death and forgetting half of the information gained in the process. No need for excel sheets anymore if good dashboard is available."),
		Home,
		RouteGroupEnum.DASHBOARD
	),
	"clientOrganizationListView": new PathRouteClass(
		new LinkInfo("/clientOrganizationListView"),
		new RouteDescription("Custom client organization table list", "Page with table and all available client organizations we do have registered"),
		ClientOrganizationListView,
		RouteGroupEnum.TABLES
	),
	"clientOrganization": new PathRouteClass(
		new LinkInfo("/clientOrganization", false),
		new RouteDescription("Detail view of one client organization", "Detail view of one selected client organization"),
		ClientOrganizationDetail
	),
	"datagridTableView": new PathRouteClass(
		new LinkInfo("/datagridTableView"),
		new RouteDescription("Component of data grid", "Data grid view of all people we have in our system"),
		DatagridTableView,
		RouteGroupEnum.TABLES
	),
	"reduxCounterExample": new PathRouteClass(
		new LinkInfo("/reduxCounter"),
		new RouteDescription("Redux counter", "Redux counter example"),
		ReduxCounterExample
	),
	"profile": new PathRouteClass(
		new LinkInfo("/profile", false),
		new RouteDescription("User profile", "Profile settings and overview"),
		Profile
	),
	"logout": new PathRouteClass(
		new LinkInfo("/logout", false),
		new RouteDescription("Logout", "Page that leads away from here"),
		Logout
	),
	"index": new PathRouteClass(
		new LinkInfo("/index"),
		new RouteDescription("Index of all pages", "Page containing index of all searchable pages"),
		IndexPage
	),
}


export default function DeclaredRoutes() {
	const dispatch = useAppDispatch()
	const token: string = useAppSelector((state) => state.profile.authenticationToken)
	const [shouldAllowUser, setShouldAllowUser] = useState<boolean>(false)

	const createSimpleRoute = (pathRoute: PathRouteClass) => {
		return (<Route path={pathRoute.linkInfo.uri} component={pathRoute.component}/>)
	}

	const isTokenValid = (token: string) => {
		return token !== undefined && token !== null && token !== ""
	}

	useEffect(() => {
		console.debug("Dispatching token check")
		dispatch(loadAuthenticationToken())
		setShouldAllowUser(isTokenValid(token))
	}, [token])

	if (shouldAllowUser) {
		console.info("Authentication token is set, loading storage")
	} else {
		console.warn("Authentication token is empty. Showing login page")
		return <LoginPage/>
	}


	return (
		<>
			<Header/>
			<Switch>
				<Route exact path={PATH_ROUTES.home.linkInfo.uri} component={PATH_ROUTES.home.component}/>
				<Route exact path={PATH_ROUTES.clientOrganization.linkInfo.uri + "/:id"} component={PATH_ROUTES.clientOrganization.component}/>
				{createSimpleRoute(PATH_ROUTES.clientOrganizationListView)}
				{createSimpleRoute(PATH_ROUTES.datagridTableView)}
				{createSimpleRoute(PATH_ROUTES.reduxCounterExample)}
				{createSimpleRoute(PATH_ROUTES.profile)}
				{createSimpleRoute(PATH_ROUTES.logout)}
				{createSimpleRoute(PATH_ROUTES.index)}

			</Switch>
		</>
	)
}
