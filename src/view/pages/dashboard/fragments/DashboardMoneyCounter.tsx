import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import SockJS from "sockjs-client"
import Stomp from "stompjs"


const sock = new SockJS("http://localhost:8080/radmintoolWebsocket")
const stompClient = Stomp.over(sock)

sock.onopen = () => {
	console.log("Websocket opened")
}
sock.onclose = () => {
	console.log("Websocket closed")
}


export default function DashboardMoneyCounter() {

	const [value, setValue] = useState(0)

	// Connecting to stomp client requires handling in componentDidUpdate otherwise warning is issued
	useEffect(() => {
		stompClient.connect({}, frame => {
			console.debug("Connected to websocket: " + frame)

			stompClient.subscribe("/topic/money", (message) => {
				console.debug("Received message from /topic/money")
				setValue(parseFloat(message.body))
			})
			stompClient.subscribe("/topic/test", (message) => {
				console.log("Got text from /topic/test - " + message.body)
			})
		}, error => {
			console.log("Error occurred " + error)
		})

	}, [])


	const sendMessage = () => {
		stompClient.send("/app/test", {}, "Testing message")
		console.info("Message sent")
	}

	return (
		<Card>
			<CardContent>
				<Grid container>
					<Grid item xs>
						<p>Money made today</p>
					</Grid>
					<Grid item xs>
						<Typography variant={"h2"} style={{color: value >= 0 ? "green" : "red"}}>
							€ {value}
							{value >= 0 ? <ArrowUpward/> : <ArrowDownward/>}
						</Typography>
					</Grid>
					<Grid item xs>
						<Button onClick={() => {
							sendMessage()
						}}>Click</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
