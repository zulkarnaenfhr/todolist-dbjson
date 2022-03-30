import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Signup2 from "./todolist-dbjson/container/pages/authentication/signup2/signup2";
import TodolistDbjson from "./todolist-dbjson/todolist-dbjson";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <TodolistDbjson />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
