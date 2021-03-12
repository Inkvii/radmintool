import {Container, Grid, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import {Inbox, Mail} from "@material-ui/icons"
import {IndexCard} from "view/pages/index/fragments/IndexCard"
import {PATH_ROUTES} from "routes"
import {Link} from "react-router-dom"

export default function IndexPage() {
	return (
		<Grid container>
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>


				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <Inbox/> : <Mail/>}</ListItemIcon>
							<ListItemText primary={text}/>
						</ListItem>
					))}
				</List>
			</Grid>
			<Grid item xs>

				<Container style={{margin: 10}}>
					<h1>Index page</h1>
					<Grid container spacing={2}>

						{Object.values(PATH_ROUTES).filter(pathRouteClass => pathRouteClass.linkInfo.searchable).map((pathRouteClass, index) => {
							return (

								<Grid item sm={12} md={6} lg={4} xl={3} key={index}>
									<Link to={pathRouteClass.linkInfo.uri} style={{textDecoration: 'none'}}>
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
