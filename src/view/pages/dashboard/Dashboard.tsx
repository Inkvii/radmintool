import React from "react"
import {Container, Grid} from "@material-ui/core"
import DashboardSettlement from "view/pages/dashboard/fragments/DashboardSettlement"
import DashboardNewCustomers from "view/pages/dashboard/fragments/DashboardNewCustomers"
import DashboardMoneyCounter from "view/pages/dashboard/fragments/DashboardMoneyCounter"

export default function Dashboard() {
	return (
		<Container>
			<h1>Dashboard</h1>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<DashboardSettlement/>
				</Grid>
				<Grid item xs={6}>
					<DashboardNewCustomers/>
				</Grid>
				<Grid item xs>
					<DashboardSettlement/>
				</Grid>
				<Grid item xs={6}>
					<DashboardMoneyCounter/>
				</Grid>
			</Grid>
		</Container>
	)
}
