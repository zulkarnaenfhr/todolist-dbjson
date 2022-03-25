import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

class Signup extends Component {
    render() {
        return (
            <div id="authentication">
                <div className="formAuthentication">
                    <div className="formAuthentication-header container">
                        <div>
                            <h3 className="formGreeting">Register Account</h3>
                            <p className="formDesc">Please fill up the following details.</p>
                        </div>
                    </div>
                    <div className="formAuthentication-body">
                        <div className="container formAuthentication-body-container">
                            <div>
                                <form action="">
                                    <input className="formAuthentication-input container" placeholder="enter username" type="text" name="" id="" />
                                    <br />
                                    <input className="formAuthentication-input formAuthentication-input-secondLayer container" placeholder="enter password" type="password" />
                                    <input className="formAuthentication-input formAuthentication-input-secondLayer container" placeholder="verify password" type="password" />
                                    <br />
                                    <div className="formAuthenticationSubmit-container">
                                        <button style={{ backgroundColor: "#6495ED" }}>Sign Up</button>
                                    </div>
                                </form>
                                <p className="anotherAuth">
                                    Already have an account?
                                    <Link className="anotherAuthLink" style={{ color: "red" }} to={`/`}>
                                        Log in
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

export default Signup;
