import {Container, Paper} from "@material-ui/core";
import Filter from "view/pages/longtable/fragment/Filter"
import {useEffect, useState} from "react";
import axios from "axios";

export default function AllTransactionsPage() {

    const [headers, setHeaders] = useState<string[]>([])

    useEffect(() => {
        axios.get("http://localhost:8080/transactions/longTransactions", {headers: {"Content-Type": "application/json"}})
            .then(result => {
                let head: string[] = []

                Object.keys(result.data).forEach(header => {
                    head.push(header)
                })
                setHeaders(head)
            })
    }, [])


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

interface Props {

}

function LongTable(props: Props) {
    return (
        <Paper>
            <h2>long table</h2>


        </Paper>
    )
}