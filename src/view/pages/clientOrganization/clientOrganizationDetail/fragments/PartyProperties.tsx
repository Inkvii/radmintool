import {Box, Card, CardContent, Grid, Tab, Tabs, TextField} from "@material-ui/core"
import React from "react"
import {PartyProperty} from "BackendObjects"

interface Props {
	partyProperties: PartyProperty[]
}

export default function PartyProperties({partyProperties}: Props) {
	const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
	const handleChange = (event: React.ChangeEvent<{}>, newSelectedIndex: number) => {
		setSelectedIndex(newSelectedIndex)
	}

	// this function will map all properties to the map based on their group
	let propertiesMap = new Map<String, PartyProperty[]>()
	partyProperties.forEach(property => {
		if (propertiesMap.has(property.group)) {
			let array: PartyProperty[] | undefined = propertiesMap.get(property.group)
			if (array !== undefined) {
				array.push(property)
			}
		} else {
			propertiesMap.set(property.group, [property])
		}
	})

	return (
		<Card style={{
			marginTop: 20
		}}>
			<CardContent>
				<h2>Party properties</h2>

				<Grid container>
					<Grid item xs={3}>
						<Tabs orientation={"vertical"} value={selectedIndex} onChange={handleChange}>
							{
								// for each group in the map, new tab will be created
								propertiesMap.size > 0 && [...propertiesMap.keys()].map((key, index) => (<Tab label={key} key={index}/>))
							}
						</Tabs>
					</Grid>
					<Grid item xs={9}>
						<Box p={3}>
							{ // based on selected index (defined by user clicking on filter list on the left side of page) different text fields
								// of party properties will be rendered
								propertiesMap.size > 0 && [...propertiesMap.values()][selectedIndex].map((partyProperty: PartyProperty, index) => (
									<TextField key={index} label={partyProperty.name} value={partyProperty.value} fullWidth={true} variant="outlined"
									           margin="normal"/>))}
						</Box>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
