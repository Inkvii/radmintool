import {Card, CardContent, CardHeader, CardMedia} from "@material-ui/core"

interface Props {
	title: string,
	description: string
}

export function IndexCard(props: Props) {
	return (
		<Card style={{height: "100%"}}>
			<CardHeader title={props.title}/>
			<CardMedia
				image={"https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
				style={{height: 200}}/>
			<CardContent>
				{props.description}
			</CardContent>
		</Card>
	)
}
