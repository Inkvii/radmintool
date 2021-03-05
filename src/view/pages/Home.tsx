import React from "react";
import {Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {Doughnut} from "react-chartjs-2";
import {ChartOptions} from "chart.js";
import {ArrowUpward} from "@material-ui/icons";

function Home() {
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
			</Grid>
		</Container>
	);
}

export default Home;


function DashboardSettlement() {

	const data = {
		labels: [
			"Cancelled", "In progress", "Done"
		],
		datasets: [{
			data: [5, 50, 100],
			backgroundColor: [
				'#e20336',
				'#377ee8',
				'#187930'
			],
			hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#4a8b0f'
			]
		}]
	};

	const options: ChartOptions = {
		cutoutPercentage: 30,
		legend: {
			display: false
		}
	}


	return (
		<Card>
			<CardContent>
				<Grid container>
					<Grid item xs>
						<p>Daily settlements progress</p>
					</Grid>
					<Grid item xs>
						<Doughnut data={data} options={options}/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

function DashboardNewCustomers() {
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
