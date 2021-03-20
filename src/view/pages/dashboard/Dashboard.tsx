import React, {useEffect, useState} from "react"
import {Container, Grid} from "@material-ui/core"
import DashboardSettlement from "view/pages/dashboard/fragments/DashboardSettlement"
import DashboardNewCustomers from "view/pages/dashboard/fragments/DashboardNewCustomers"
import DashboardMoneyCounter from "view/pages/dashboard/fragments/DashboardMoneyCounter"
import SockJS from "sockjs-client"
import Stomp from "stompjs"


/**
 * Dashboard is an example of using websockets and graphs
 * @constructor
 */
export default function Dashboard() {
	// STOMP protocol is used for communication with websocket. That allows sending json payload through ws and even http protocols
	// in case browser does not support websockets.
	// Stomp client handles communication via SockJS
	const [stompClient, setStompClient] = useState<Stomp.Client | undefined>()
	const [websocketConnected, setWebsocketConnected] = useState<boolean>(stompClient?.connected ?? false)

	// Connecting to stomp client requires handling in componentDidUpdate otherwise warning is issued
	useEffect(() => {
		let isSubscribed = true

		if (isSubscribed) {
			let sock = new SockJS("http://localhost:8080/radmintoolWebsocket")

			sock.onopen = () => {
				console.log("Websocket opened")
			}
			sock.onclose = () => {
				console.log("Websocket closed")
			}

			let client = Stomp.over(sock)
			client.connect({}, frame => {
				console.debug("Connected to websocket: " + frame)
				setWebsocketConnected(client.connected)

				// Subscribing to a queue on backend needs to be done after stomp client succeeds in creating connection
				// Subscribing in this case equals to receiving data from server when its data changes
				// Can be considered as push notifications
				client.subscribe("/topic/test", (message) => {
					console.log("Got text from /topic/test - " + message.body)
				})
				setStompClient(client)
			}, error => {
				console.log("Error occurred during connecting step " + error)
			})
		}

		// To prevent unclosed sessions, when user moves to different page, the connection is closed
		return function cleanup() {
			isSubscribed = false
			console.debug("Cleanup websocket connection")
			if (stompClient) {
				debugger
				stompClient.disconnect(() => {
					console.debug("Websocket disconnected")
				})
			}

		}
		// eslint-disable-next-line
	}, [])


	return (
		<Container>
			<h1>Dashboard</h1>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<DashboardSettlement/>
				</Grid>
				<Grid item xs={6}>
					<DashboardNewCustomers/>
				</Grid>
				<Grid item xs>
					<DashboardSettlement/>
				</Grid>
				<Grid item xs={6}>
					<DashboardMoneyCounter stompClient={stompClient} isWebsocketConnected={websocketConnected}/>
				</Grid>
			</Grid>
		</Container>
	)
}
