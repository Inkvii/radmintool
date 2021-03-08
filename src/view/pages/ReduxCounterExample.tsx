import {Button, Container, Grid, Paper, Typography} from "@material-ui/core"
import {decrement, increment, incrementBy} from "redux/CounterSlice"
import {useAppDispatch, useAppSelector} from "redux/hooks"
import {useEffect, useState} from "react"


export default function ReduxCounterExample() {
	const currentValue: number = useAppSelector((state) => state.counter.currentCounterValue)
	const dispatch = useAppDispatch()
	const [counterColor, setCounterColor] = useState("black")

	//setting state dynamically whenever currentValue is changed. Since we use dispatch, checking for value change is done here
	useEffect(() => {
		if (currentValue > 0) {
			setCounterColor("green")
		} else if (currentValue < 0) {
			setCounterColor("red")
		} else setCounterColor("black")

	}, [currentValue])

	// if all buttons look the same, we can create button creator
	const createButton = (text: string, action: CallableFunction, state?: any) => <Button color={"primary"} variant={"outlined"}
	                                                                                      fullWidth={true}
	                                                                                      onClick={() => dispatch(action(state))}>{text}</Button>

	return (
		<Container>
			<h2>Redux counter example</h2>
			<Paper style={{width: 300}}>
				<Grid container spacing={1} style={{padding: 10}}>
					<Grid item xs={12}>
						<Typography variant={"h3"} align={"center"} style={{color: counterColor}}>{currentValue}</Typography>
					</Grid>
					<Grid item xs={6}>
						{createButton("Increment", increment)}
					</Grid>
					<Grid item xs={6}>
						{createButton("Decrement", decrement)}
					</Grid>
					<Grid item xs={12}>
						{createButton("Increment by 11", incrementBy, 11)}
					</Grid>
				</Grid>
			</Paper>
		</Container>
	)
}





