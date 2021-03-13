import {
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
import {PATH_ROUTES, PathRouteClass, RouteGroupEnum} from "routes"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"


export default function IndexPage() {
	const classes = useStyles()
	const [activeGroup, setActiveGroup] = useState<RouteGroupEnum | null>(null)
	const [colorMap, setColorMap] = useState<Map<RouteGroupEnum, string>>(new Map())

	useEffect(() => {
		// assign color map only once per rendering IndexPage (colors will change once page is reloaded or changed from and back).
		// possible fix would be moving this to redux and initialize once. But since this is only for proof of concept, i would say no big deal

		const tempMap = new Map<RouteGroupEnum, string>()
		Object.values(PATH_ROUTES).forEach((pathRoute) => {
			tempMap.set(pathRoute.group, ("#" + (Math.random() * 0xFFFFFF << 0).toString(16)))
		})

		setColorMap(tempMap)
		console.log("Color map has been set")
	}, [])


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
			<Grid item xs={12} sm={4} md={3} lg={2} xl={1}>
				<List subheader={<ListSubheader component="div" disableSticky={true}>Filter pages</ListSubheader>}>
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

				<div className={classes.content}>
					<Typography variant={"h3"} style={{marginBottom: 10}}>Index page</Typography>
					<Grid container spacing={2} alignItems={"stretch"} alignContent={"stretch"} justify={"flex-start"}>

						{filteredRoutes().map((pathRouteClass: PathRouteClass, index: number) => {
							return (
								<Grid item sm={12} md={6} lg={3} xl={2} key={index}>
									<Link to={pathRouteClass.linkInfo.uri} className={classes.link}>
										<IndexCard title={pathRouteClass.description.headerName}
										           description={pathRouteClass.description.longDescription || pathRouteClass.description.shortDescription}
										           headerColor={colorMap.get(pathRouteClass.group)}/>
									</Link>
								</Grid>
							)
						})}

						{/*This part is redundant and can be removed - its there just to make illusion of filled index page*/}
						{filteredRoutes().map((pathRouteClass: PathRouteClass, index: number) => {
							return (

								<Grid item sm={12} md={6} lg={3} xl={2} key={index}>
									<Link to={pathRouteClass.linkInfo.uri} className={classes.link}>
										<IndexCard title={pathRouteClass.description.headerName}
										           description={pathRouteClass.description.longDescription || pathRouteClass.description.shortDescription}
										           headerColor={colorMap.get(pathRouteClass.group)}/>
									</Link>
								</Grid>
							)
						})}
						{/*End of redundant part*/}

					</Grid>
				</div>
			</Grid>
		</Grid>
	)
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	link: {
		textDecoration: "none",
	},
	content: {
		marginLeft: 20,
		marginRight: 20
	}
}))
