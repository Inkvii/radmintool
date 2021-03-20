import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import {Client} from "stompjs"


interface Props {
	stompClient?: Client,
	isWebsocketConnected: boolean
}

/**
 * Example of using websocket to render value from response.
 * Value is fetched via websocket and stored as a state that will trigger rendering change
 * @param props
 * @constructor
 */
export default function DashboardMoneyCounter(props: Props) {

	const [value, setValue] = useState(0)

	// Run after websocket is connected so we can subscribe to the topic
	useEffect(() => {
		if (!props.isWebsocketConnected) {
			console.info("Websocket is not connected yet")
			return
		}

		props.stompClient?.subscribe("/topic/money", (message) => {
			console.debug("Received message from /topic/money")
			setValue(parseFloat(message.body))
		})
	}, [props.isWebsocketConnected, props.stompClient])

	// Example of sending message to the backend. Outgoing messages are handled by /app controller whereas incoming messages
	// are handled via /topic controller
	const sendMessage = () => {
		props.stompClient?.send("/app/test", {}, "Testing message")
		console.info("Message sent")
	}

	// Example of differentiation between /topic/money and /app/money
	const requestMoneyCounterUpdate = () => {
		props.stompClient?.send("/app/money", {})
	}

	return (
		<Card>
			<CardContent>
				<Grid container>
					<Grid item xs={8}>
						<Grid item xs={12}>
							<p>Money made in last 5 minutes</p>
						</Grid>
						<Grid item xs={12}>
							<Typography variant={"h2"} style={{color: value >= 0 ? "green" : "red"}}>
								€ {value}
								{value >= 0 ? <ArrowUpward/> : <ArrowDownward/>}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<Grid item xs={12}>
							<Button fullWidth onClick={() => {
								sendMessage()
							}}>Click</Button>
						</Grid>
						<Grid item xs={12}>
							<Button fullWidth onClick={() => {
								requestMoneyCounterUpdate()
							}}>Update</Button>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
