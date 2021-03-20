import {TextField, Typography} from "@material-ui/core"
import {useEffect, useState} from "react"

interface Props {
	fieldName: string,
	value: string,
	editMode: boolean
	callbackOnChange: Function
}

/**
 * Component that appears either as text (read only) or as a textfield.
 * Useful for editing data without changing the look of the page too much
 * @param props
 * @constructor
 */
export default function EditableTextField({...props}: Props) {
	const [value, setValue] = useState<string>(props.value)

	useEffect(() => {
		console.debug(`Effect was called. Value set to ${props.value}`)
		setValue(props.value)
	}, [props.value])

	/**
	 * Takes care of changing value of the state as well as propagating it upwards ba calling a callback with field name and its new value
	 * @param event
	 */
	const registerOnChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const eventValue = event.target.value
		props.callbackOnChange(props.fieldName, eventValue)
		setValue(eventValue)
	}
	// it is entirely possible to handle code (when not in useEffect function, will update each render) before return is issued
	if (props.editMode)
		return <TextField value={value} onChange={(event) => registerOnChangeEvent(event)}/>
	else
		return <Typography variant={"body1"}>{value}</Typography>

}
