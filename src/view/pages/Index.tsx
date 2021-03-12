import {Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import {Inbox, Mail} from "@material-ui/icons"

export default function Index() {
	return (
		<Grid container>
			<Grid item xs={3}>


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

				<Container>
					<h1>Index page</h1>
					<Button>Hello</Button>
					<Button>Hello</Button>
					<Button>Hello</Button>
					<Button>Hello</Button>
					<Button>Hello</Button>
					<Button>Hello</Button>
					<Button>Hello</Button>
				</Container>
			</Grid>
		</Grid>
	)
}
