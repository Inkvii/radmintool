import {TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";

type Props = {
	headers: string[]
}

export default function TableHeader({headers}: Props) {
	return (
		<TableHead>
			<TableRow>
				{headers.map((header, index) => {
					return (<TableCell key={index}>{header}</TableCell>)
				})}
			</TableRow>
		</TableHead>
	)
}

