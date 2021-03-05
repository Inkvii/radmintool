import './App.css';
import React from "react";
import Header from "./view/header/Header";
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import DeclaredRoutes from "./routes";


export default function App() {
	return (
		<div>
			<CssBaseline/>
			<BrowserRouter>
				<Header/>
				<DeclaredRoutes/>
			</BrowserRouter>
		</div>
	);
}

