import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { API } from "../../../../service";
import Signupstep1 from "../../../../component/signupForm/signUpStep1";
import Signupstep2 from "../../../../component/signupForm/signUpStep2";
import Swal from "sweetalert2";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formStep: 1,
            userData: {
                id: "",
                password: "",
                name: "",
                profession: "",
                placeofbirth: "",
                dateofbirth: "",
                todo: [],
                firstRegister: true,
            },
            professionCategory: [],
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
            statusPasswordValidation: "", // apakah password sesuai dengan berbagai syarat yang dibutuhkan, true = sesuai
            sameUsernameFound: "",
            usernameContainsSpace: "",
            showPasswordValidation: false,

            loadData: false,
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSamePassword = this.handleSamePassword.bind(this);
        this.handleSubmitFormRegister = this.handleSubmitFormRegister.bind(this);
        this.handleFirstLetterUsername = this.handleFirstLetterUsername.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.handleSameUsername = this.handleSameUsername.bind(this);
        this.handleUsernameContainsSpace = this.handleUsernameContainsSpace.bind(this);

        this.handleForm1Submit = this.handleForm1Submit.bind(this);
        this.buttonHiddenTriggerSignupLink = createRef();
    }
    handleForm1Submit = () => {
        this.setState({
            formStep: 2,
        });
    };
    handleSubmitFormRegister = (event) => {
        event.preventDefault();

        const canInput = async () => {
            await API.postUserData(this.state.userData);
            this.setState({
                userData: {
                    id: "",
                    password: "",
                    name: "",
                    profession: "",
                    placeofbirth: "",
                    dateofbirth: "",
                    todo: [],
                    firstRegister: true,
                },
            });
            await Swal.fire({
                icon: "success",
                title: "<strong>Successful Registration!</strong>",
                footer: "<p>Please Login, With Your Account</p>",
                timer: "3000",
            });
            this.buttonHiddenTriggerSignupLink.current.click();
        };

        if (this.state.sameUsernameFound === false) {
            if (this.state.statusFirstLetterUsername === false) {
                if (this.state.statusSamePasswordVerify === true) {
                    if (this.state.statusPasswordValidation === true) {
                        canInput();
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
        const cekSamePassword = () => {
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

        await cekSamePassword();

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
    handleFirstLetterUsername = async (event) => {
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
        if (password.length > 7) {
            formStatusPasswordValidationNew["minimumLength"] = true;
        } else {
            formStatusPasswordValidationNew["minimumLength"] = false;
        }

        this.setState({
            formStatusPasswordValidation: formStatusPasswordValidationNew,
        });

        const passwordValid = async () => {
            await this.setState({
                statusPasswordValidation: false,
            });
            if (
                this.state.formStatusPasswordValidation.containNumbers === true &&
                this.state.formStatusPasswordValidation.lowerCaseLetters === true &&
                this.state.formStatusPasswordValidation.minimumLength === true &&
                this.state.formStatusPasswordValidation.upperCaseLetters === true
            ) {
                this.setState({
                    statusPasswordValidation: true,
                });
            }
        };
        passwordValid();
    };
    handleFormChange = async (name, value) => {
        if (name !== "verifyPassword") {
            let userDataNew = { ...this.state.userData };
            userDataNew[name] = value;
            this.setState({
                userData: userDataNew,
            });
        }
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
    handleUsernameContainsSpace = (event) => {
        if (event.target.value !== "") {
            if (event.target.value.indexOf(" ") < 1) {
                this.setState({
                    usernameContainsSpace: false,
                });
            } else {
                this.setState({
                    usernameContainsSpace: true,
                });
            }
        } else {
            this.setState({
                usernameContainsSpace: "",
            });
        }
    };
    async componentDidMount() {
        await API.getAllProfessionCategory().then((data) =>
            this.setState({
                professionCategory: data.data,
            })
        );
        this.setState({
            loadData: true,
        });
    }
    render() {
        return (
            <div id="authentication">
                {this.state.loadData === false ? (
                    ""
                ) : (
                    <div>
                        <div style={{ display: "none" }}>
                            <Link
                                ref={this.buttonHiddenTriggerSignupLink}
                                to={{
                                    pathname: "/todolist-dbjson/",
                                }}
                                state={{
                                    fromSignUp: true,
                                }}
                            >
                                link to login, after signup success
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
                                        <Signupstep1
                                            formStep={this.state.formStep}
                                            handleForm1Submit={this.handleForm1Submit}
                                            // punya semuanya
                                            onFormChange={(name, value) => this.handleFormChange(name, value)}
                                            // batas semuanya

                                            // punya username
                                            username={this.state.userData.id}
                                            onSameUsername={(event) => this.handleSameUsername(event)}
                                            onUsernameContainsSpace={(event) => this.handleUsernameContainsSpace(event)}
                                            onFirstLetterUsername={(event) => this.handleFirstLetterUsername(event)}
                                            statusFirstLetterUsername={this.state.statusFirstLetterUsername}
                                            sameUsernameFound={this.state.sameUsernameFound}
                                            usernameContainsSpace={this.state.usernameContainsSpace}
                                            // batas username

                                            // punya password
                                            statusPasswordValidation={this.state.statusPasswordValidation}
                                            password={this.state.password}
                                            onPasswordFocus={() => {
                                                this.setState({
                                                    showPasswordValidation: true,
                                                });
                                            }}
                                            onPasswordBlur={() => {
                                                this.setState({
                                                    showPasswordValidation: false,
                                                });
                                            }}
                                            onHandleSamePassword={(event) => this.handleSamePassword(event)}
                                            passwordValidation={this.passwordValidation}
                                            showPasswordValidation={this.state.showPasswordValidation}
                                            formStatusPasswordValidation={this.state.formStatusPasswordValidation}
                                            // batas password

                                            // punya verify password
                                            statusSamePasswordVerify={this.state.statusSamePasswordVerify}
                                            // batas verify password
                                        />
                                        <Signupstep2
                                            // buat semuanya
                                            formStep={this.state.formStep}
                                            handleFormChange={(name, value) => this.handleFormChange(name, value)}
                                            // akhir semuanya

                                            // buat nama
                                            name={this.state.userData.name}
                                            // akhir nama

                                            // buat placeofbirth
                                            placeofbirth={this.state.userData.placeofbirth}
                                            // akhir placeofbirth

                                            // buat dateofbirth
                                            dateofbirth={this.state.userData.dateofbirth}
                                            // akhir dateofbirth

                                            // buat profession
                                            professionCategory={this.state.professionCategory}
                                            // akhir profession

                                            handleForm2Submit={(event) => this.handleSubmitFormRegister(event)}
                                        />
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
                )}
            </div>
        );
    }
}

export default Signup;
// import React, { Component, createRef } from "react";
// import { Link } from "react-router-dom";
// import "./signup.css";
// import { API } from "../../../../service";

// class Signup extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             userData: {
//                 id: "",
//                 password: "",
//                 name: "",
//                 profession: "",
//                 placeofbirth: "",
//                 dateofbirth: "",
//                 todo: [],
//                 firstRegister: true,
//             },
//             password: "",
//             verifyPassword: "",

//             // penjelasan jok lupa
//             statusFirstLetterUsername: "", // status apakah first letter username mengandung, true = mengandung number
//             statusSamePasswordVerify: "", // apakah verify password sudah sesuai, true = password sama
//             formStatusPasswordValidation: {
//                 lowerCaseLetters: false,
//                 upperCaseLetters: false,
//                 containNumbers: false,
//                 minimumLength: false,
//             },
//             statusPasswordValidation: "", // apakah password sesuai dengan berbagai syarat yang dibutuhkan, true = sesuai
//             sameUsernameFound: "",
//             usernameContainsSpace: "",
//             showPasswordValidation: false,
//         };

//         this.handleFormChange = this.handleFormChange.bind(this);
//         this.handleSamePassword = this.handleSamePassword.bind(this);
//         this.handleSubmitFormRegister = this.handleSubmitFormRegister.bind(this);
//         this.handleFirstLetterUsername = this.handleFirstLetterUsername.bind(this);
//         this.passwordValidation = this.passwordValidation.bind(this);
//         this.handleSameUsername = this.handleSameUsername.bind(this);
//         this.handleUsernameContainsSpace = this.handleUsernameContainsSpace.bind(this);

//         this.buttonHiddenTriggerSignupLink = createRef();
//     }
//     handleSubmitFormRegister = (event) => {
//         event.preventDefault();

//         const canInput = async () => {
//             await API.postUserData(this.state.userData);
//             alert("pendaftaran berhasil");
//             this.setState({
//                 userData: {
//                     id: "",
//                     password: "",
//                     name: "",
//                     profession: "",
//                     placeofbirth: "",
//                     dateofbirth: "",
//                     todo: [],
//                     firstRegister: true,
//                 },
//             });
//             this.buttonHiddenTriggerSignupLink.current.click();
//         };

//         if (this.state.sameUsernameFound === false) {
//             if (this.state.statusFirstLetterUsername === false) {
//                 if (this.state.statusSamePasswordVerify === true) {
//                     if (this.state.statusPasswordValidation === true) {
//                         canInput();
//                     } else {
//                         // alert("password validasi belum sesuai");
//                     }
//                 } else {
//                     // alert("password not match");
//                 }
//             } else {
//                 // alert("first letter username cant numeric");
//             }
//         } else {
//             // alert("username telah ditemukan");
//         }
//     };
//     handleSamePassword = async (event) => {
//         const cekSamePassword = () => {
//             if (event.target.name === "password") {
//                 this.setState({
//                     password: event.target.value,
//                 });
//             } else if (event.target.name === "verifyPassword") {
//                 this.setState({
//                     verifyPassword: event.target.value,
//                 });
//             }
//         };

//         await cekSamePassword();

//         if (this.state.verifyPassword !== "") {
//             if (this.state.password === this.state.verifyPassword && this.state.password !== "") {
//                 this.setState({
//                     statusSamePasswordVerify: true,
//                 });
//             } else {
//                 this.setState({
//                     statusSamePasswordVerify: false,
//                 });
//             }
//         } else {
//             this.setState({
//                 statusSamePasswordVerify: "",
//             });
//         }
//     };
//     handleFirstLetterUsername = async (event) => {
//         // untuk mengantisipasi first letter username is a number
//         if (event.target.value === "") {
//             this.setState({
//                 statusFirstLetterUsername: "",
//             });
//         } else {
//             this.setState({
//                 statusFirstLetterUsername: /[0-9]/.test(event.target.value[0]),
//             });
//         }
//     };
//     passwordValidation = (event) => {
//         let lowerCaseLetters = /[a-z]/g;
//         let upperCaseLetters = /[A-Z]/g;
//         let numbers = /[0-9]/g;

//         let password = event.target.value;

//         let formStatusPasswordValidationNew = { ...this.state.formStatusPasswordValidation };

//         if (password.match(lowerCaseLetters)) {
//             formStatusPasswordValidationNew["lowerCaseLetters"] = true;
//         } else {
//             formStatusPasswordValidationNew["lowerCaseLetters"] = false;
//         }
//         if (password.match(upperCaseLetters)) {
//             formStatusPasswordValidationNew["upperCaseLetters"] = true;
//         } else {
//             formStatusPasswordValidationNew["upperCaseLetters"] = false;
//         }
//         if (password.match(numbers)) {
//             formStatusPasswordValidationNew["containNumbers"] = true;
//         } else {
//             formStatusPasswordValidationNew["containNumbers"] = false;
//         }
//         if (password.length > 7) {
//             formStatusPasswordValidationNew["minimumLength"] = true;
//         } else {
//             formStatusPasswordValidationNew["minimumLength"] = false;
//         }

//         this.setState({
//             formStatusPasswordValidation: formStatusPasswordValidationNew,
//         });

//         const passwordValid = async () => {
//             await this.setState({
//                 statusPasswordValidation: false,
//             });
//             if (
//                 this.state.formStatusPasswordValidation.containNumbers === true &&
//                 this.state.formStatusPasswordValidation.lowerCaseLetters === true &&
//                 this.state.formStatusPasswordValidation.minimumLength === true &&
//                 this.state.formStatusPasswordValidation.upperCaseLetters === true
//             ) {
//                 this.setState({
//                     statusPasswordValidation: true,
//                 });
//             }
//         };
//         passwordValid();
//     };
//     handleFormChange = async (name, value) => {
//         if (name !== "verifyPassword") {
//             let userDataNew = { ...this.state.userData };
//             userDataNew[name] = value;
//             this.setState({
//                 userData: userDataNew,
//             });
//         }
//     };
//     handleSameUsername = (event) => {
//         if (event.target.value !== "") {
//             API.getUserData(event.target.value)
//                 .then((data) => {
//                     this.setState({
//                         sameUsernameFound: true,
//                     });
//                 })
//                 .catch((err) => {
//                     this.setState({
//                         sameUsernameFound: false,
//                     });
//                 });
//         } else {
//             this.setState({
//                 sameUsernameFound: "",
//             });
//         }
//     };
//     handleUsernameContainsSpace = (event) => {
//         if (event.target.value !== "") {
//             if (event.target.value.indexOf(" ") < 1) {
//                 this.setState({
//                     usernameContainsSpace: false,
//                 });
//             } else {
//                 this.setState({
//                     usernameContainsSpace: true,
//                 });
//             }
//         } else {
//             this.setState({
//                 usernameContainsSpace: "",
//             });
//         }
//     };
//     render() {
//         return (
//             <div id="authentication">
//                 <div style={{ display: "none" }}>
//                     <Link
//                         ref={this.buttonHiddenTriggerSignupLink}
//                         to={{
//                             pathname: "/todolist-dbjson/",
//                         }}
//                         state={{
//                             fromSignUp: true,
//                         }}
//                     >
//                         link to login, after signup success
//                     </Link>
//                 </div>
//                 <div className="formAuthentication">
//                     <div className="formAuthentication-header container">
//                         <div>
//                             <h3 className="formGreeting">Register Account</h3>
//                             <p className="formDesc">Please fill up the following details.</p>
//                         </div>
//                     </div>
//                     <div className="formAuthentication-body">
//                         <div className="container formAuthentication-body-container">
//                             <div>
//                                 <form action="" onSubmit={this.handleSubmitFormRegister}>
//                                     <input
//                                         autoComplete="off"
//                                         required
//                                         onKeyUp={(event) => {
//                                             this.handleSameUsername(event);
//                                             this.handleUsernameContainsSpace(event);
//                                         }}
//                                         onChange={(event) => {
//                                             this.handleFormChange(event.target.name, event.target.value.toLowerCase());
//                                             this.handleFirstLetterUsername(event);
//                                         }}
//                                         className="formAuthentication-input container"
//                                         placeholder="enter username"
//                                         type="text"
//                                         name="id"
//                                     />
//                                     <p className={this.state.statusFirstLetterUsername === true ? "urgentFirstLetterUsername" : "urgentFirstLetterUsername-none"}>
//                                         <i className="fa-solid fa-circle-info"></i> first letter of the username cannot be a number
//                                     </p>
//                                     <p className={this.state.sameUsernameFound === true ? "urgentUsernameFound" : "urgentUsernameFound-none"}>
//                                         <i className="fa-solid fa-circle-info"></i> username already exist
//                                     </p>
//                                     <p className={this.state.usernameContainsSpace === true ? "urgentUsernameFound" : "urgentUsernameFound-none"}>
//                                         <i className="fa-solid fa-circle-info"></i> username can't contains space
//                                     </p>
//                                     <br />
//                                     <input
//                                         style={this.state.statusPasswordValidation !== true && this.state.password !== "" ? { border: "2px solid red" } : { border: "1px solid black" }}
//                                         autoComplete="off"
//                                         required
//                                         onFocus={() => {
//                                             this.setState({
//                                                 showPasswordValidation: true,
//                                             });
//                                         }}
//                                         onBlur={() => {
//                                             this.setState({
//                                                 showPasswordValidation: false,
//                                             });
//                                         }}
//                                         onKeyUp={this.passwordValidation}
//                                         onChange={(event) => {
//                                             this.handleFormChange(event.target.name, event.target.value);
//                                             this.handleSamePassword(event);
//                                         }}
//                                         className="formAuthentication-input formAuthentication-input-secondLayer container"
//                                         placeholder="enter password"
//                                         type="password"
//                                         name="password"
//                                     />
//                                     <div style={this.state.showPasswordValidation ? { display: "block" } : { display: "none" }}>
//                                         <p className="alertPassword" style={this.state.formStatusPasswordValidation.containNumbers ? { color: "green" } : { color: "red" }}>
//                                             {" "}
//                                             <i className="fa-solid fa-circle-info"></i> contains number
//                                         </p>
//                                         <p className="alertPassword" style={this.state.formStatusPasswordValidation.minimumLength ? { color: "green" } : { color: "red" }}>
//                                             {" "}
//                                             <i className="fa-solid fa-circle-info"></i> minimum length
//                                         </p>
//                                         <p className="alertPassword" style={this.state.formStatusPasswordValidation.upperCaseLetters ? { color: "green" } : { color: "red" }}>
//                                             {" "}
//                                             <i className="fa-solid fa-circle-info"></i> uppercase
//                                         </p>
//                                         <p className="alertPassword" style={this.state.formStatusPasswordValidation.lowerCaseLetters ? { color: "green" } : { color: "red" }}>
//                                             {" "}
//                                             <i className="fa-solid fa-circle-info"></i> lowercase
//                                         </p>
//                                     </div>
//                                     <p
//                                         className={
//                                             this.state.statusPasswordValidation === false && this.state.showPasswordValidation === false && this.state.password !== "" ? "urgentPasswordNotRequirement" : "urgentPasswordNotRequirement-none"
//                                         }
//                                     >
//                                         <i className="fa-solid fa-circle-info"></i> password does not meet the requirements
//                                     </p>
//                                     <input
//                                         autoComplete="off"
//                                         required
//                                         onChange={(event) => {
//                                             this.handleFormChange(event.target.name, event.target.value);
//                                             this.handleSamePassword(event);
//                                         }}
//                                         className="formAuthentication-input formAuthentication-input-secondLayer container"
//                                         placeholder="confirm password"
//                                         type="password"
//                                         name="verifyPassword"
//                                     />
//                                     <p className={this.state.statusSamePasswordVerify === false ? "urgentPassword" : "urgentPassword-none"}>
//                                         <i className="fa-solid fa-circle-info"></i> Password confirmation does not match Password
//                                     </p>
//                                     <br />
//                                     <div className="formAuthenticationSubmit-container">
//                                         <button type="submit" style={{ backgroundColor: "#6495ED" }}>
//                                             Sign Up
//                                         </button>
//                                     </div>
//                                 </form>
//                                 <p className="anotherAuth">
//                                     Already have an account?
//                                     <Link className="anotherAuthLink" style={{ color: "red" }} to={`/todolist-dbjson/`}>
//                                         Log in
//                                     </Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Signup;
