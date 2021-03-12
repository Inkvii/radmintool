import {AccountCircle} from "@material-ui/icons"
import {IconButton, Menu, MenuItem} from "@material-ui/core"
import React from "react"
import {useHistory} from "react-router-dom"
import {PATH_ROUTES} from "routes"

export default function ProfileButton() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const history = useHistory()

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClick = (link: string) => {
		setAnchorEl(null)
		history.push(link)
	}


	return (
		<>
			<IconButton edge={"end"} color={"inherit"} onClick={handleClick}>
				<AccountCircle/>
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleMenuClick}
			>
				<MenuItem
					onClick={() => handleMenuClick(PATH_ROUTES.profile.linkInfo.uri)}>{PATH_ROUTES.profile.description.headerName}</MenuItem>
				<MenuItem
					onClick={() => handleMenuClick(PATH_ROUTES.logout.linkInfo.uri)}>{PATH_ROUTES.logout.description.headerName}</MenuItem>
			</Menu>
		</>
	)
}
