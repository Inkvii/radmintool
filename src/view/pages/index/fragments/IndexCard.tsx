import {Card, CardContent, CardHeader, CardMedia, createStyles, makeStyles, Theme} from "@material-ui/core"

interface Props {
	title: string,
	description: string,
	headerColor?: string
}

export function IndexCard(props: Props) {

	const useStyles = makeStyles((theme: Theme) => createStyles({
		link: {
			height: '100%',
			"&:hover": {
				boxShadow: "5px 5px 3px #A0A0A0"
			}
		},
		header: {
			borderTop: "5px solid " + (props.headerColor ?? theme.palette.primary.main)
		}
	}))
	const classes = useStyles()

	return (
		<Card className={classes.link}>
			<CardHeader title={props.title} className={classes.header}/>
			<CardMedia
				image={"https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
				style={{height: 200}}/>
			<CardContent>
				{props.description}
			</CardContent>
		</Card>
	)


}

