import {TextField, Typography} from "@material-ui/core"
import {useEffect, useState} from "react"

interface Props {
	fieldName: string,
	value: string,
	editMode: boolean
	callbackOnChange: Function
}

export default function EditableTextField({...props}: Props) {
	const [value, setValue] = useState<string>(props.value)

	useEffect(() => {
		console.debug(`Effect was called. Value set to ${props.value}`)
		setValue(props.value)
	}, [props.value])


	const registerOnChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const eventValue = event.target.value
		props.callbackOnChange(props.fieldName, eventValue)
		setValue(eventValue)
	}

	if (props.editMode)
		return <TextField value={value} onChange={(event) => registerOnChangeEvent(event)}/>
	else
		return <Typography variant={"body1"}>{value}</Typography>

}
