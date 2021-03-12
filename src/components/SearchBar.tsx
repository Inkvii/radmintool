import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core"
import {PATH_ROUTES, PathRouteClass} from "routes"
import {useHistory} from "react-router-dom"

export default function SearchBar() {
	const options = Object.values(PATH_ROUTES).filter(value => value.linkInfo.searchable)
	const history = useHistory()
	const classes = useStyles()

	const [selectedValue, setSelectedValue] = React.useState<PathRouteClass | null>(null)
	const [inputValue, setInputValue] = React.useState('')

	const handleRouterLink = (option: PathRouteClass) => {
		history.push(option.linkInfo.uri)
	}

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
			classes={{listbox: classes.myListbox}}
			options={options} // list of suggestions in the dropdown list
			getOptionSelected={(option, value) => option.description.headerName === value.description.headerName} //probably equals() method
			getOptionLabel={(option => option.description.headerName)} // what will be seen in input box after option is selected
			renderInput={(params) => <TextField {...params} placeholder={"Search"} variant="outlined" size={"small"} fullWidth={true}/>}
			renderOption={(option) => (
				<Grid container onClick={() => {
					handleRouterLink(option)
				}}>
					<Grid item xs={8}>
						<Typography variant={"body1"}>{option.description.headerName}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant={"body2"}> This is the very long text that has been here with
							uri: {option.linkInfo.uri} </Typography>
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
		backgroundColor: theme.palette.primary.light,
		color: "#FFF",
		borderRadius: 0,
	},
}))
