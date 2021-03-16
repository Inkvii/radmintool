import {ChartOptions} from "chart.js"
import {Card, CardContent, Grid} from "@material-ui/core"
import {Doughnut} from "react-chartjs-2"
import React from "react"

export default function DashboardSettlement() {

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
	}

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
