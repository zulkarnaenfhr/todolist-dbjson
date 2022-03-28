import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./container/pages/authentication/login/login";
import "./todolist-dbjson.css";
import Signup from "./container/pages/authentication/signup/signup";
import Homepage from "./container/pages/Home/Homepage";

class TodolistDbjson extends Component {
    render() {
        return (
            <div id="rootParent">
                <Routes>
                    <Route path="/todolist-dbjson/" exact element={<Login />} />
                    <Route path="/todolist-dbjson/signup" exact element={<Signup />} />
                    <Route path="/todolist-dbjson/homepage" exact element={<Homepage />} />
                    <Route
                        path="*"
                        element={
                            <div>
                                <p>not found</p>
                            </div>
                        }
                    />{" "}
                </Routes>
            </div>
        );
    }
}

export default TodolistDbjson;
