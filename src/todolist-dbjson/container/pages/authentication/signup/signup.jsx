import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { API } from "../../../../service";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                id: "",
                password: "",
                nama: "",
                tempatlahir: "",
                notes: [],
                firstRegister: true,
            },
            password: "",
            verifyPassword: "",

            // penjelasan jok lupa
            statusFirstLetterUsername: "", // status apakah first letter username mengandung, true = mengandung number
            statusSamePasswordVerify: "", // apakah verify password sudah sesuai, true = password sama
            formStatusPasswordValidation: {
                lowerCaseLetters: false,
                upperCaseLetters: false,
                containNumbers: false,
                minimumLength: false,
            },
            statusPaswordValidation: "", // apakah password sesuai dengan berbagai syarat yang dibutuhkan, true = sesuai
            sameUsernameFound: "",
            showPasswordValidation: false,
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSamePassword = this.handleSamePassword.bind(this);
        this.handleSubmitFormRegister = this.handleSubmitFormRegister.bind(this);
        this.handleid = this.handleid.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.handleSameUsername = this.handleSameUsername.bind(this);

        this.buttonHiddenTriggerSignupLink = createRef();
    }
    handleSubmitFormRegister = (event) => {
        event.preventDefault();

        const bolehKumpul = () => {
            API.getUserData(this.state.userData.id)
                .then((data) => {})
                .catch((err) => {
                    API.postUserData(this.state.userData);
                    alert("pendaftaran berhasil");
                    this.setState({
                        userData: {
                            id: "",
                            password: "",
                            nama: "",
                            tempatlahir: "",
                            notes: [],
                            firstRegister: true,
                        },
                    });
                    this.buttonHiddenTriggerSignupLink.current.click();
                });
        };

        if (this.state.sameUsernameFound === false) {
            if (this.state.statusFirstLetterUsername === false) {
                if (this.state.statusSamePasswordVerify === true) {
                    if (this.state.statusPaswordValidation === true) {
                        bolehKumpul();
                    } else {
                        // alert("password validasi belum sesuai");
                    }
                } else {
                    // alert("password not match");
                }
            } else {
                // alert("first letter username cant numeric");
            }
        } else {
            // alert("username telah ditemukan");
        }
    };
    handleSamePassword = async (event) => {
        const maman = () => {
            if (event.target.name === "password") {
                this.setState({
                    password: event.target.value,
                });
            } else if (event.target.name === "verifyPassword") {
                this.setState({
                    verifyPassword: event.target.value,
                });
            }
        };

        await maman();

        if (this.state.verifyPassword !== "") {
            if (this.state.password === this.state.verifyPassword && this.state.password !== "") {
                this.setState({
                    statusSamePasswordVerify: true,
                });
            } else {
                this.setState({
                    statusSamePasswordVerify: false,
                });
            }
        } else {
            this.setState({
                statusSamePasswordVerify: "",
            });
        }
    };
    handleid = async (event) => {
        // untuk mengantisipasi first letter username is a number
        if (event.target.value === "") {
            this.setState({
                statusFirstLetterUsername: "",
            });
        } else {
            this.setState({
                statusFirstLetterUsername: /[0-9]/.test(event.target.value[0]),
            });
        }
    };
    passwordValidation = (event) => {
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;

        let password = event.target.value;

        let formStatusPasswordValidationNew = { ...this.state.formStatusPasswordValidation };

        if (password.match(lowerCaseLetters)) {
            formStatusPasswordValidationNew["lowerCaseLetters"] = true;
        } else {
            formStatusPasswordValidationNew["lowerCaseLetters"] = false;
        }
        if (password.match(upperCaseLetters)) {
            formStatusPasswordValidationNew["upperCaseLetters"] = true;
        } else {
            formStatusPasswordValidationNew["upperCaseLetters"] = false;
        }
        if (password.match(numbers)) {
            formStatusPasswordValidationNew["containNumbers"] = true;
        } else {
            formStatusPasswordValidationNew["containNumbers"] = false;
        }
        if (event.target.value.length > 8) {
            formStatusPasswordValidationNew["minimumLength"] = true;
        } else {
            formStatusPasswordValidationNew["minimumLength"] = false;
        }

        this.setState({
            formStatusPasswordValidation: formStatusPasswordValidationNew,
        });

        const passwordValid = () => {
            if (
                this.state.formStatusPasswordValidation.containNumbers === true &&
                this.state.formStatusPasswordValidation.lowerCaseLetters === true &&
                this.state.formStatusPasswordValidation.minimumLength === true &&
                this.state.formStatusPasswordValidation.upperCaseLetters === true
            ) {
                this.setState({
                    statusPaswordValidation: true,
                });
            }
        };
        passwordValid();
    };
    handleFormChange = async (name, value) => {
        let userDataNew = { ...this.state.userData };
        userDataNew[name] = value;
        this.setState({
            userData: userDataNew,
        });
    };
    handleSameUsername = (event) => {
        if (event.target.value !== "") {
            API.getUserData(event.target.value)
                .then((data) => {
                    this.setState({
                        sameUsernameFound: true,
                    });
                })
                .catch((err) => {
                    this.setState({
                        sameUsernameFound: false,
                    });
                });
        } else {
            this.setState({
                sameUsernameFound: "",
            });
        }
    };
    render() {
        return (
            <div id="authentication">
                <div style={{ display: "none" }}>
                    <Link ref={this.buttonHiddenTriggerSignupLink} to={`/todolist-dbjson/`}>
                        <p>Link to log in, after register success</p>
                    </Link>
                </div>
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
                                <form action="" onSubmit={this.handleSubmitFormRegister}>
                                    <input
                                        autoComplete="off"
                                        required
                                        onKeyUp={this.handleSameUsername}
                                        onChange={(event) => {
                                            this.handleFormChange(event.target.name, event.target.value.toLowerCase());
                                            this.handleid(event);
                                        }}
                                        className="formAuthentication-input container"
                                        placeholder="enter username"
                                        type="text"
                                        name="id"
                                    />
                                    <p className={this.state.statusFirstLetterUsername === true ? "urgentFirstLetterUsername" : "urgentFirstLetterUsername-none"}>
                                        <i className="fa-solid fa-circle-info"></i> first letter of the username cannot be a number
                                    </p>
                                    <p className={this.state.sameUsernameFound === true ? "urgentUsernameFound" : "urgentUsernameFound-none"}>
                                        <i className="fa-solid fa-circle-info"></i> username found
                                    </p>
                                    <br />
                                    <input
                                        autoComplete="off"
                                        required
                                        onFocus={() => {
                                            this.setState({
                                                showPasswordValidation: true,
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                showPasswordValidation: false,
                                            });
                                        }}
                                        onKeyUp={this.passwordValidation}
                                        onChange={(event) => {
                                            this.handleFormChange(event.target.name, event.target.value);
                                            this.handleSamePassword(event);
                                        }}
                                        className="formAuthentication-input formAuthentication-input-secondLayer container"
                                        placeholder="enter password"
                                        type="password"
                                        name="password"
                                    />
                                    <div style={this.state.showPasswordValidation ? { display: "block" } : { display: "none" }}>
                                        <p className="alertPassword" style={this.state.formStatusPasswordValidation.containNumbers ? { color: "green" } : { color: "red" }}>
                                            {" "}
                                            <i className="fa-solid fa-circle-info"></i> contains number
                                        </p>
                                        <p className="alertPassword" style={this.state.formStatusPasswordValidation.minimumLength ? { color: "green" } : { color: "red" }}>
                                            {" "}
                                            <i className="fa-solid fa-circle-info"></i> minimum length
                                        </p>
                                        <p className="alertPassword" style={this.state.formStatusPasswordValidation.upperCaseLetters ? { color: "green" } : { color: "red" }}>
                                            {" "}
                                            <i className="fa-solid fa-circle-info"></i> uppercase
                                        </p>
                                        <p className="alertPassword" style={this.state.formStatusPasswordValidation.lowerCaseLetters ? { color: "green" } : { color: "red" }}>
                                            {" "}
                                            <i className="fa-solid fa-circle-info"></i> lowercase
                                        </p>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        required
                                        onChange={(event) => {
                                            this.handleFormChange(event.target.name, event.target.value);
                                            this.handleSamePassword(event);
                                        }}
                                        className="formAuthentication-input formAuthentication-input-secondLayer container"
                                        placeholder="confirm password"
                                        type="password"
                                        name="verifyPassword"
                                    />
                                    <p className={this.state.statusSamePasswordVerify === false ? "urgentPassword" : "urgentPassword-none"}>
                                        <i className="fa-solid fa-circle-info"></i> Password confirmation does not match Password
                                    </p>
                                    <br />
                                    <div className="formAuthenticationSubmit-container">
                                        <button type="submit" style={{ backgroundColor: "#6495ED" }}>
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                                <p className="anotherAuth">
                                    Already have an account?
                                    <Link className="anotherAuthLink" style={{ color: "red" }} to={`/todolist-dbjson/`}>
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
