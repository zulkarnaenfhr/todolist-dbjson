import React, { Component } from "react";
import { data } from "./dataCek";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./container/pages/login/login";
import "./todolist-dbjson.css";
import Signup from "./container/pages/signup/signup";

class TodolistDbjson extends Component {
    render() {
        return (
            <div id="rootParent">
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/signup" exact element={<Signup />} />
                </Routes>
            </div>
        );
    }
}

export default TodolistDbjson;
