import {Box, Card, CardContent, Grid, Tab, Tabs, TextField} from "@material-ui/core";
import React, {useEffect} from "react";
import {loadPartyProperties} from "../../../../db/DatabaseConnector";

interface PartyProperty {
	name: string,
	value: string
}

interface PartyPropertyList {
	clientOrgId: number,
	basicInfo: PartyProperty[],
	emailTemplates: PartyProperty[],
	settlement: PartyProperty[],
	payout: PartyProperty[]
}


export default function PartyProperties() {
	const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
	const [partyPropertiesList, setPartyPropertiesList] = React.useState<PartyPropertyList>({
		clientOrgId: 0,
		basicInfo: [],
		emailTemplates: [],
		payout: [],
		settlement: []
	})

	const handleChange = (event: React.ChangeEvent<{}>, newSelectedIndex: number) => {
		setSelectedIndex(newSelectedIndex);
	};

	useEffect(() => {
		const fetchMyPromise = async () => {
			const promise: PartyPropertyList = await fetchPartyProperties()
			console.log("Promise is retrieved " + promise)
			setPartyPropertiesList(promise)
		}
		fetchMyPromise()
	}, [partyPropertiesList])


	return (
		<Card style={{
			marginTop: 20
		}}>
			<CardContent>
				<h2>Party properties</h2>

				<Grid container>
					<Grid item xs={3}>
						<Tabs orientation={"vertical"} value={selectedIndex} onChange={handleChange}>
							<Tab label={"Basic info"}/>
							<Tab label={"Email templates"}/>
							<Tab label={"Setlement"}/>
							<Tab label={"Payout"}/>
						</Tabs>
					</Grid>
					<Grid item xs={9}>
						{selectedIndex === 0 && (
							<Box p={3}>
								{partyPropertiesList.basicInfo.map((partyProperty: PartyProperty) => (
									<TextField label={partyProperty.name} value={partyProperty.value} fullWidth={true} variant="outlined"
									           margin="normal"/>
								))}
							</Box>

						)}
						{selectedIndex === 1 && (
							<Box p={3}>
								{partyPropertiesList.emailTemplates.map((partyProperty: PartyProperty) => (
									<TextField label={partyProperty.name} value={partyProperty.value} fullWidth={true} variant="outlined"
									           margin="normal"/>
								))}
							</Box>
						)}
						{selectedIndex === 2 && (
							<Box p={3}>
								{partyPropertiesList.settlement.map((partyProperty: PartyProperty) => (
									<TextField label={partyProperty.name} value={partyProperty.value} fullWidth={true} variant="outlined"
									           margin="normal"/>
								))}
							</Box>
						)}
						{selectedIndex === 3 && (
							<Box p={3}>
								{partyPropertiesList.payout.map((partyProperty: PartyProperty) => (
									<TextField label={partyProperty.name} value={partyProperty.value} fullWidth={true} variant="outlined"
									           margin="normal"/>
								))}
							</Box>
						)}
					</Grid>
				</Grid>
			</CardContent>
		</Card>


	)
}


async function fetchPartyProperties(): Promise<PartyPropertyList> {
	// normally there would be an id as parameter, but im too lazy to create more items in json

	console.log("Starting to fetch party properties")
	const jsonArray: any = await loadPartyProperties(500, 0)
	console.log("Json is loaded: " + jsonArray)
	return jsonArray
}
