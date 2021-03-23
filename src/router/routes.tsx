import Dashboard from "view/pages/dashboard/Dashboard"
import ClientOrganizationListView from "view/pages/clientOrganization/ClientOrganizationListView"
import ClientOrganizationDetail from "view/pages/clientOrganization/clientOrganizationDetail/ClientOrganizationDetail"
import React from "react"
import DatagridTableView from "view/pages/DatagridTableView"
import ReduxCounterExample from "view/pages/ReduxCounterExample"
import Profile from "view/pages/Profile"
import Logout from "view/pages/Logout"
import IndexPage from "view/pages/index/IndexPage"
import {Permission} from "security/AuthenticationToken"
import RestrictedPage from "view/pages/RestrictedPage"
import PersonDetail from "view/pages/person/PersonDetail"
import AllTransactionsPage from "../view/pages/longtable/AllTransactionsPage";

/**
 * Class containing information about URI and if it shows in other components
 */
export class LinkInfo {
	uri: string
	searchable: boolean

	constructor(uri: string, searchable: boolean = true) {
		this.uri = uri
		this.searchable = searchable
	}
}

/**
 * Class describes the route in greater detail. For purposes of routing, this is irrelevant
 */
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

/**
 * Class composed of other URI info, description, what component is being rendered, filtering and permissions needed to view the page
 */
export default class PathRouteClass {
	linkInfo: LinkInfo
	description: RouteDescription
	component: React.FunctionComponent
	group: RouteGroupEnum
	permissions: Permission[]


	constructor(linkInfo: LinkInfo, description: RouteDescription, component: React.FunctionComponent, group: RouteGroupEnum = RouteGroupEnum.OTHER, permissions: Permission[] = []) {
		this.linkInfo = linkInfo
		this.description = description
		this.component = component
		this.group = group
		this.permissions = permissions
	}
}

/**
 * Constant declaring all paths that are available in this project.
 * NOTE: if path is added here, it must be added to DeclaredRoutes as well, otherwise it might be declared but isnt registered
 * (that is - empty page would show up)
 */
export const PATH_ROUTES = {
	"dashboard": new PathRouteClass(
		new LinkInfo("/"),
		new RouteDescription("Dashboard", "Page about day to day goings", "Dashboard is considered as one quick overview over day to day happenings, monitoring key performance indicators, seeing all important activity on one place without need for clicking oneself to death and forgetting half of the information gained in the process. No need for excel sheets anymore if good dashboard is available."),
		Dashboard,
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
		ReduxCounterExample,
		RouteGroupEnum.OTHER,
		[Permission.REDUX_COUNTER]
	),
	"profile": new PathRouteClass(
		new LinkInfo("/profile", false),
		new RouteDescription("User profile", "Profile settings and overview"),
		Profile,
		RouteGroupEnum.OTHER,
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
	"restrictedPage": new PathRouteClass(
		new LinkInfo("/restrictedPage"),
		new RouteDescription("Restricted page", "Only for admin eyes"),
		RestrictedPage,
		RouteGroupEnum.OTHER,
		[Permission.ADMIN_PAGE]
	),
	"person": new PathRouteClass(
		new LinkInfo("/person", false),
		new RouteDescription("Person detail", "Detail of one person", "Page contains information about person and their transaction history"),
		PersonDetail,
	),
	"allTransactions": new PathRouteClass(
		new LinkInfo("/alltransactions"),
		new RouteDescription("All transactions", "all of them", "really all of the transactions"),
		AllTransactionsPage
	)
}


