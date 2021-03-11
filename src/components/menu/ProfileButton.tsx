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
				<MenuItem onClick={() => handleMenuClick(PATH_ROUTES.profile.uri)}>{PATH_ROUTES.profile.displayName}</MenuItem>
				<MenuItem onClick={() => handleMenuClick(PATH_ROUTES.logout.uri)}>{PATH_ROUTES.logout.displayName}</MenuItem>
			</Menu>
		</>
	)
}
