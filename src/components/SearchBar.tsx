import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {Grid, TextField, Typography} from "@material-ui/core"
import styled from "styled-components"
import {PATH_ROUTES, PathRoute} from "routes"
import {useHistory} from "react-router-dom"


const StyledTextField = styled(TextField)`
	.MuiInput-root {
		padding-left: 10px;

	}
	.MuiInputBase-input {
		color: white;
	}
		
	.MuiOutlinedInput-root {
		background-color:  rgb(194,47,47);
    fieldset {
      border: none;
    }
  }
		
` as typeof TextField

export default function SearchBar() {
	const options = Object.values(PATH_ROUTES).filter(value => value.searchable)
	const history = useHistory()

	const [selectedValue, setSelectedValue] = React.useState<PathRoute | null>(options[0])
	const [inputValue, setInputValue] = React.useState('')

	const handleRouterLink = (option: PathRoute) => {
		history.push(option.uri)
	}

	return (
		<Autocomplete
			value={selectedValue}
			onChange={(event: any, newValue: PathRoute | null) => {
				setSelectedValue(newValue)
			}}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue)
			}}
			options={options} // list of suggestions in the dropdown list
			getOptionSelected={(option, value) => option.displayName === value.displayName} //probably equals() method
			getOptionLabel={(option => option.displayName)} // what will be seen in input box after option is selected
			color={"primary"}
			renderInput={(params) => <StyledTextField {...params} variant="outlined" size={"small"} fullWidth={true}/>}
			renderOption={(option) => (
				<Grid container style={{padding: 10}} onClick={() => {
					handleRouterLink(option)
				}}>
					<Grid item xs={8}>
						<Typography variant={"body1"}>{option.displayName}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant={"body2"}> This is the very long text that has been here with
							uri: {option.uri} </Typography>
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
