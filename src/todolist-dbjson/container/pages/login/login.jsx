import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";

class Login extends Component {
    render() {
        return (
            <div id="login">
                <div className="formLogin heightLogin">
                    <div className="formLogin-header container">
                        <div>
                            <h3 className="formGreeting">Welcome Back</h3>
                            <p className="formDesc">Log in to your account</p>
                        </div>
                    </div>
                    <div className="formLogin-body">
                        <div className="container formLogin-body-container">
                            <div>
                                <form action="">
                                    <input className="formInput" placeholder="Enter Username" type="text" name="" id="" />
                                    <br />
                                    <input className="formInput formInput-secondLayer" placeholder="Enter Password" type="password" />
                                    <br />
                                    <div className="containerSignIn">
                                        <button>Log in</button>
                                    </div>
                                </form>
                                <p className="goSignUp">
                                    not registered yet?
                                    <Link className="goSignUpLink" to={`/signUp`}>Create Account</Link>
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
