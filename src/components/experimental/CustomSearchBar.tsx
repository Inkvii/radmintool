import {createStyles, Grid, InputBase, makeStyles, Theme, Typography} from "@material-ui/core"
import React, {useEffect, useRef, useState} from "react"
import {useAutocomplete} from "@material-ui/lab"
import {SearchIcon} from "@material-ui/data-grid"
import {Link} from "react-router-dom"
import {PATH_ROUTES} from "router/routes"

export default function CustomSearchBar() {

	const [searchBarWidth, setSearchBarWidth] = useState<number>(100)
	const [opened, setOpened] = useState<boolean>(false)
	const searchbarRef = useRef<HTMLInputElement>(null)
	const classes = useStyles()

	const {
		getRootProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		options: Object.values(PATH_ROUTES).filter(value => value.linkInfo.searchable), //what will be in the dropdown listbox
		getOptionLabel: (option) => option.description.headerName, // what will be seen in input box after option is selected
		getOptionSelected: (option, value) => option.description.headerName === value.description.headerName, //probably equals() method
		onOpen: () => {
			setOpened(true)
		},
		onClose: () => {
			setOpened(false)
		}
	})

	useEffect(() => {
		//since we are using Grid, we need to setup dropdown listbox's width after CustomSearchBar is rendered by parent
		if (searchbarRef && searchbarRef.current) {
			setSearchBarWidth(searchbarRef.current.offsetWidth)
		}
	}, [searchbarRef])

	return (
		<Grid container>
			<Grid item xs={1}>
				<SearchIcon className={classes.searchIcon}/>
			</Grid>
			<Grid item xs>
				<div {...getRootProps()} ref={searchbarRef}>
					<InputBase className={classes.input + " " + (opened ? "" : classes.closedInput)} {...getInputProps()}/>
				</div>
				{groupedOptions.length > 0 ? (
					<ul className={classes.listbox} style={{width: searchBarWidth}} {...getListboxProps()}>
						{groupedOptions.map((option, index) => (
							<li {...getOptionProps({option, index})}>
								<Link style={{textDecoration: "none", color: "white"}} to={option.linkInfo.uri}>
									<Grid container style={{padding: 10}}>
										<Grid item xs={8}>
											<Typography variant={"body1"}>{option.description.headerName}</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography variant={"body2"}> This is the very long text that has been here with
												uri: {option.linkInfo.uri} </Typography>
										</Grid>
									</Grid>
								</Link>
							</li>
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

	closedInput: {
		borderRadius: 7
	},

	input: {
		color: "#fff",
		backgroundColor: theme.palette.primary.light,
		paddingLeft: 10,
		paddingRight: 10,
		width: "100%",
		borderTopLeftRadius: 7,
		borderTopRightRadius: 7,
		border: "none"

	},
	listbox: {
		margin: 0,
		padding: 0,
		zIndex: 1,
		position: 'absolute',
		listStyle: 'none',
		color: "#fff",
		backgroundColor: theme.palette.primary.light,
		overflow: 'auto',
		maxHeight: 400,
		borderBottomLeftRadius: 7,
		borderBottomRightRadius: 7,
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
