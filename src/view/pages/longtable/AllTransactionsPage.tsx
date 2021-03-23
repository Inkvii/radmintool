import {Container, Paper} from "@material-ui/core";
import Filter from "view/pages/longtable/fragment/Filter"
import {useState} from "react";

export default function AllTransactionsPage() {

    const [headers, setHeaders] = useState(["first", "second", "third"])

    const triggerFilter = (filterHeaders: {}) => {
        console.info("Trigger filtering according to: "+ JSON.stringify(filterHeaders))
    }

    return (
        <Container>
            <Filter headers={headers} triggerFilterCallback={triggerFilter}/>
            <LongTable/>
        </Container>
    )
}


function LongTable() {
    return (
        <Paper>
            <h2>long table</h2>
        </Paper>
    )
}