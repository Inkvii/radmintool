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
		setValue(props.value)
	}, [props.value])

	const registerOnChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (event.target.value) {
			setValue(event.target.value)
			props.callbackOnChange(props.fieldName, value)
		}
	}

	if (props.editMode)
		return <TextField value={value} onChange={(event) => registerOnChangeEvent(event)}/>
	else
		return <Typography variant={"body1"}>{value}</Typography>

}
