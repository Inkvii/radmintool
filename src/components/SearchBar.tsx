import {SearchIcon} from "@material-ui/data-grid";
import {createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";
import React from "react";
import {Autocomplete} from "@material-ui/lab";

interface MySuggestions {
	title: string,
	year: number
}


export default function SearchBar() {
	const classes = useStyles()

	const top100Films: MySuggestions[] = [
		{title: 'The Shawshank Redemption', year: 1994},
		{title: 'The Godfather', year: 1972},
		{title: 'The Godfather: Part II', year: 1974},
		{title: 'The Dark Knight', year: 2008},
		{title: '12 Angry Men', year: 1957},
		{title: "Schindler's List", year: 1993}
	]


	return (
		<Grid container>
			<Grid item xs={1}>
				<SearchIcon className={classes.searchIcon}/>
			</Grid>
			<Grid item xs>
				<Autocomplete
					id="combo-box-demo"
					className={classes.field}
					options={top100Films}
					getOptionLabel={(option) => option.title}
					renderInput={(params) => <TextField {...params} variant="outlined" size={"small"}/>}
				/>
			</Grid>
		</Grid>
	)
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	field: {
		color: "inherit"
	},
	searchIcon: {
		height: '100%',
		pointerEvents: 'none',
	},

}))
