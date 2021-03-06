import {createStyles, Grid, InputBase, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {useAutocomplete} from "@material-ui/lab";
import {SearchIcon} from "@material-ui/data-grid";

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

	const {
		getRootProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		options: top100Films,
		getOptionLabel: (option) => option.title,
	});

	return (
		<Grid container>
			<Grid item xs={1}>
				<SearchIcon className={classes.searchIcon}/>
			</Grid>
			<Grid item xs>
				<div {...getRootProps()}>
					<InputBase className={classes.input} {...getInputProps()} />
				</div>
				{groupedOptions.length > 0 ? (
					<ul className={classes.listbox} {...getListboxProps()}>
						{groupedOptions.map((option, index) => (
							<li {...getOptionProps({option, index})}>{option.title}</li>
						))}
					</ul>
				) : null}
			</Grid>
		</Grid>
	)
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	searchIcon: {
		height: '100%',
		pointerEvents: 'none',
	},

	input: {
		color: "#ffffff",
		backgroundColor: theme.palette.primary.light,
		paddingLeft: 10,
		paddingRight: 10,
		width: "100%",
		borderRadius: 7,
		border: "none"

	},
	listbox: {
		width: 500,
		margin: 0,
		padding: 0,
		zIndex: 1,
		position: 'absolute',
		listStyle: 'none',
		color: "#000",
		backgroundColor: "#ffffff",
		overflow: 'hidden',
		maxHeight: 200,
		border: '1px solid rgba(0,0,0,.25)',
		'& li[data-focus="true"]': {
			backgroundColor: '#4a8df6',
			color: 'white',
			cursor: 'pointer',
		},
		'& li:active': {
			backgroundColor: '#2977f5',
			color: 'white',
		},
	},


}))
