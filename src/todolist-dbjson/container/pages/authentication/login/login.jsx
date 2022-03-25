import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import "../authentication.css";

class Login extends Component {
    render() {
        return (
            <div id="authentication">
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
                                    <input className="formAuthentication-input" placeholder="Enter Username" type="text" name="" id="" />
                                    <br />
                                    <input className="formAuthentication-input formAuthentication-input-secondLayer" placeholder="Enter Password" type="password" />
                                    <br />
                                    <div className="formAuthenticationSubmit-container">
                                        <button style={{ backgroundColor: "#ea5f76" }}>Log in</button>
                                    </div>
                                </form>
                                <p className="anotherAuth">
                                    not registered yet?
                                    <Link className="anotherAuthLink" style={{ color: "#6495ED" }} to={`/signUp`}>
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
