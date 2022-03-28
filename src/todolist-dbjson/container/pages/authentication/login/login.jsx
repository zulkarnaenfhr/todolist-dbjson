import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import "../authentication.css";
import { API } from "../../../../service";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formLogin: {
                username: "",
                password: "",
            },
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.buttonHiddenTriggerLoginLink = createRef();
    }
    handleFormChange = (event) => {
        const formLoginNew = { ...this.state.formLogin };
        formLoginNew[event.target.name] = event.target.value;
        this.setState({
            formLogin: formLoginNew,
        });
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.formLogin.username === "" || this.state.formLogin.password === "") {
            console.log("gaoleh masuk");
        } else {
            API.getUserData(this.state.formLogin.username)
                .then((result) => {
                    console.log("data ditemukan", result.data);
                    if (this.state.formLogin.password === result.data.password) {
                        console.log("berhasil masuk");
                        this.buttonHiddenTriggerLoginLink.current.click();
                    } else {
                        console.log("password salah");
                    }
                })
                .catch((err) => {
                    alert("salah jon");
                });
        }
    };
    render() {
        return (
            <div id="authentication">
                <div style={{ display: "none" }}>
                    <Link
                        ref={this.buttonHiddenTriggerLoginLink}
                        to={{
                            pathname: "/todolist-dbjson/homepage",
                        }}
                        state={{ nama: this.state.formLogin.username, password: this.state.formLogin.password }}
                        id={this.state.formLogin.username}
                    >
                        <p>link to homepage, after log in success</p>
                    </Link>
                    {/* <Link ref={this.buttonHiddenTriggerLoginLink} to={`/todolist-dbjson/homepage`} id={this.state.formLogin.username}>
                        <p>link to homepage, after log in success</p>
                    </Link> */}
                </div>
                <div className="formAuthentication">
                    <div className="formAuthentication-header container">
                        <div>
                            <h3 className="formGreeting">Welcome Back</h3>
                            <p className="formDesc">Log in to your account</p>
                        </div>
                    </div>
                    <div className="formAuthentication-body">
                        <div className="container formAuthentication-body-container">
                            <div>
                                <form action="">
                                    <input onChange={this.handleFormChange} className="formAuthentication-input container" placeholder="Enter Username" type="text" name="username" id="" />
                                    <br />
                                    <input onChange={this.handleFormChange} className="formAuthentication-input formAuthentication-input-secondLayer container" name="password" placeholder="Enter Password" type="password" />
                                    <br />
                                    <div className="formAuthenticationSubmit-container">
                                        <button onClick={this.handleFormSubmit} style={{ backgroundColor: "#ea5f76" }}>
                                            Log in
                                        </button>
                                        {/* <Link onClick={this.handleFormSubmit} className="buttonLogin" style={{ color: "black", textDecoration: "none" }} to={`/todolist-dbjson/homepage`}>
                                            <span style={{ marginTop: "7px" }}>Log In</span>
                                        </Link> */}
                                    </div>
                                </form>
                                <p className="anotherAuth">
                                    not registered yet?
                                    <Link className="anotherAuthLink" style={{ color: "#6495ED" }} to={`/todolist-dbjson/signUp`}>
                                        Create Account
                                    </Link>
                                </p>
                                <button
                                    onClick={() => {
                                        console.log(this.state.formLogin);
                                    }}
                                >
                                    cek button
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
