import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import "../authentication.css";
import { API } from "../../../../service";
import { useLocation } from "react-router-dom";

class LoginChild extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formLogin: {
                username: "",
                password: "",
            },
            statusLogin: "",
            isSignUp: "",
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
                    if (this.state.formLogin.password === result.data.password) {
                        console.log("berhasil masuk");
                        this.buttonHiddenTriggerLoginLink.current.click();
                    } else {
                        this.setState({
                            statusLogin: false,
                        });
                    }
                })
                .catch((err) => {
                    this.setState({
                        statusLogin: false,
                    });
                });
        }
    };
    async componentDidMount() {
        if (this.props.location.state !== null) {
            await this.setState({
                isSignUp: this.props.location.state.fromSignUp,
            });
        }
    }

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
                    >
                        <p>link to homepage, after log in success</p>
                    </Link>
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
                                <div className={this.state.isSignUp === true && this.state.statusLogin !== false ? "alertLogin alertFromSignUp" : "alertLogin-hide"}>
                                    <p>sign up success</p>
                                </div>
                                <div className={this.state.statusLogin === false ? "alertLogin alertWrongVerify" : "alertLogin-hide"}>
                                    <p>username or password is incorrect</p>
                                </div>
                                <form action="" onSubmit={this.handleFormSubmit}>
                                    <input required onChange={this.handleFormChange} className="formAuthentication-input container" placeholder="Enter Username" type="text" name="username" id="" />
                                    <br />
                                    <input required onChange={this.handleFormChange} className="formAuthentication-input formAuthentication-input-secondLayer container" name="password" placeholder="Enter Password" type="password" />
                                    <br />
                                    <div className="formAuthenticationSubmit-container">
                                        <button type="submit" style={{ backgroundColor: "#ea5f76" }}>
                                            Log in
                                        </button>
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
                                        console.log(this.state.isSignUp);
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

const Login = () => {
    const location = useLocation();

    return <LoginChild location={location} />;
};

export default Login;
