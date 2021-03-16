import {Card, CardContent, Grid, Typography} from "@material-ui/core"
import {ArrowUpward} from "@material-ui/icons"
import React from "react"

export default function DashboardNewCustomers() {
	return (
		<Card>
			<CardContent>
				<Grid container>
					<Grid item xs>
						<p>Number of new customers per 1 week</p>
					</Grid>
					<Grid item xs>
						<Typography variant={"h2"} style={{color: "green"}}>
							12487
							<ArrowUpward/>
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
