import {Box, Button, Paper, TextField} from "@material-ui/core";
import {useState} from "react";

interface Props {
    headers: string[],
    triggerFilterCallback: Function
}

export default function Filter(props: Props) {

    const [data, setData] = useState({})

    const changeValue = (key: string, value: string) => {

        const keyvalueObject = {[key]: value}

        let newData = {...data, ...keyvalueObject}

        setData(newData)
        console.info(newData)
    }

    return (
        <Paper>
            <Box display={"flex"} flexDirection={"column"} padding={2} margin={1}>
                <h2>Filter</h2>
                {props.headers.map((header, index) => <TextField key={header} label={header} variant={"standard"} onChange={(e) => changeValue(header,e.target.value) }/>)}

                <Button variant={"contained"} onClick={() => props.triggerFilterCallback(data)} style={{marginTop: 20}}>Filter</Button>
            </Box>
        </Paper>
    )
}