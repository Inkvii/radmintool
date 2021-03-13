import {
	Container,
	createStyles,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	makeStyles,
	Theme,
	Typography
} from "@material-ui/core"
import {Mail} from "@material-ui/icons"
import {IndexCard} from "view/pages/index/fragments/IndexCard"
import {PATH_ROUTES, RouteGroupEnum} from "routes"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"

export default function IndexPage() {
	const classes = useStyles()
	const [activeGroup, setActiveGroup] = useState<RouteGroupEnum | null>(null)


	useEffect(() => {
		console.info(`User pressed ${activeGroup}`)
	}, [activeGroup])

	const filteredRoutes = () => {
		return Object.values(PATH_ROUTES)
			.filter(pathRouteClass => (pathRouteClass.linkInfo.searchable))
			.filter(pathRouteClass => {
				if (activeGroup !== null) {
					return pathRouteClass.group === activeGroup
				}
				return true
			})
	}

	return (
		<Grid container style={{marginTop: 10, marginBottom: 10}}>
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
				<List subheader={<ListSubheader component="div">Filter pages</ListSubheader>}>
					<ListItem button key={"null"} onClick={() => {
						setActiveGroup(null)
					}}>
						<ListItemIcon>{<Mail/>}</ListItemIcon>
						<ListItemText primary={"All"}/>
					</ListItem>

					{Object.values(RouteGroupEnum).map((routeGroupKey: string, index) => (
						<ListItem button key={routeGroupKey} onClick={() => {
							setActiveGroup(routeGroupKey as unknown as RouteGroupEnum || null)
						}}>
							<ListItemIcon>{<Mail/>}</ListItemIcon>
							<ListItemText primary={routeGroupKey}/>
						</ListItem>
					))}
				</List>
			</Grid>
			<Grid item xs>

				<Container>
					<Typography variant={"h3"} style={{marginBottom: 10}}>Index page</Typography>
					<Grid container spacing={2}>

						{filteredRoutes().map((pathRouteClass, index) => {
							return (

								<Grid item sm={12} md={6} lg={4} xl={3} key={index}>
									<Link to={pathRouteClass.linkInfo.uri} className={classes.link}>
										<IndexCard title={pathRouteClass.description.headerName}
										           description={pathRouteClass.description.longDescription || pathRouteClass.description.shortDescription}/>
									</Link>
								</Grid>
							)
						})}
					</Grid>
				</Container>
			</Grid>
		</Grid>
	)
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	link: {
		textDecoration: "none",
	},
}))
