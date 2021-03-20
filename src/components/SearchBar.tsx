import React, {useEffect} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core"
import PathRouteClass, {PATH_ROUTES} from "router/routes"
import {useHistory} from "react-router-dom"

/**
 * One of the more complex components in this project.
 * Search bar is connected to PATH_ROUTES which contains all routing destinations.
 * Search bar will over in its dropdown listbox only those paths that are searchable (to avoid showing paths where e.g. id is needed (clientOrganization/:id)
 *
 * Uses Material UI's Autocomplete component but modifies how dropdown listbox should look like.
 * @constructor
 */
export default function SearchBar() {
	const options = Object.values(PATH_ROUTES).filter(value => value.linkInfo.searchable)
	const history = useHistory()
	const classes = useStyles()

	const [selectedValue, setSelectedValue] = React.useState<PathRouteClass | null>(null)
	const [inputValue, setInputValue] = React.useState('')

	useEffect(() => {
		if (selectedValue) {
			history.push(selectedValue.linkInfo.uri)
		}
	}, [selectedValue, history])

	return (
		<Autocomplete
			value={selectedValue}
			onChange={(event: any, newValue: PathRouteClass | null) => {
				setSelectedValue(newValue)
			}}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue)
			}}
			autoHighlight={true}
			classes={{listbox: classes.myListbox, option: classes.option}}
			options={options} // list of suggestions in the dropdown list
			getOptionSelected={(option: PathRouteClass, value: PathRouteClass) => option.description.headerName === value.description.headerName} //probably equals() method
			getOptionLabel={((option: PathRouteClass) => option.description.headerName)} // what will be seen in input box after option is selected
			renderInput={(params) => <TextField {...params} placeholder={"Search"} variant="outlined" size={"small"} fullWidth={true}/>}
			renderOption={(option: PathRouteClass) => (
				<Grid container>
					<Grid item xs={8}>
						<Typography variant={"body1"}>{option.description.headerName}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant={"body2"}> {option.description.shortDescription} </Typography>
					</Grid>
				</Grid>
			)}
			onOpen={() => {
				// delete input value when user clicks on the text field so they dont have to delete content it manually
				setInputValue("")
			}}
		/>
	)
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	myListbox: {
		backgroundColor: theme.palette.secondary.main,
		color: "#FFF",
		borderRadius: 0,
	},
	option: {
		// Hover
		'&[data-focus="true"]': {
			backgroundColor: theme.palette.secondary.dark,
			borderColor: 'transparent',
		},
		// Selected
		'&[aria-selected="true"]': {
			backgroundColor: theme.palette.primary.light,
			borderColor: 'transparent',
		},
	},
}))
