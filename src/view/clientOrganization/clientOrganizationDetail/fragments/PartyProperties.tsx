import {Card, Grid, List, ListItem, ListItemText} from "@material-ui/core";

export default function PartyProperties() {
	return (
		<Card style={{
			marginTop: 20
		}}>

			<Grid container>
				<Grid item xs={4}>
					<List>
						{["Basic info", "Email templates", "Settlement", "Payout"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemText primary={text}/>
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={8}>
					<p>Lorem ipsum dolosrrsrasras as lakshjd lksj dlkas jldj aslkd jalskjd laskjd lkasjd lkas</p>
					<p>Lorem ipsum dolosrrsrasras as lakshjd lksj dlkas jldj aslkd jalskjd laskjd lkasjd lkas</p>
					<p>Lorem ipsum dolosrrsrasras as lakshjd lksj dlkas jldj aslkd jalskjd laskjd lkasjd lkas</p>
					<p>Lorem ipsum dolosrrsrasras as lakshjd lksj dlkas jldj aslkd jalskjd laskjd lkasjd lkas</p>
					<p>Lorem ipsum dolosrrsrasras as lakshjd lksj dlkas jldj aslkd jalskjd laskjd lkasjd lkas</p>
					<p>Lorem ipsum dolosrrsrasras as lakshjd lksj dlkas jldj aslkd jalskjd laskjd lkasjd lkas</p>
				</Grid>
			</Grid>
		</Card>


	)
}
