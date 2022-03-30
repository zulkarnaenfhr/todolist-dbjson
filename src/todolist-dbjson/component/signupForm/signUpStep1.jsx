import React, { Component } from "react";

class Signupstep1 extends Component {
    render() {
        return (
            <div>
                {this.props.formStep !== 1 ? (
                    ""
                ) : (
                    <form action="" onSubmit={this.props.handleForm1Submit}>
                        <input
                            autoComplete="off"
                            required
                            onKeyUp={(event) => {
                                this.props.onSameUsername(event);
                                this.props.onUsernameContainsSpace(event);
                            }}
                            onChange={(event) => {
                                this.props.onFormChange(event.target.name, event.target.value.toLowerCase());
                                this.props.onFirstLetterUsername(event);
                            }}
                            className="formAuthentication-input container"
                            placeholder="enter username"
                            type="text"
                            name="id"
                            value={this.props.username}
                        />
                        <p className={this.props.statusFirstLetterUsername === true ? "urgentFirstLetterUsername" : "urgentFirstLetterUsername-none"}>
                            <i className="fa-solid fa-circle-info"></i> first letter of the username cannot be a number
                        </p>
                        <p className={this.props.sameUsernameFound === true ? "urgentUsernameFound" : "urgentUsernameFound-none"}>
                            <i className="fa-solid fa-circle-info"></i> username already exist
                        </p>
                        <p className={this.props.usernameContainsSpace === true ? "urgentUsernameFound" : "urgentUsernameFound-none"}>
                            <i className="fa-solid fa-circle-info"></i> username can't contains space
                        </p>
                        <br />
                        <input
                            style={this.props.statusPasswordValidation !== true && this.props.password !== "" ? { border: "2px solid red" } : { border: "1px solid black" }}
                            autoComplete="off"
                            required
                            onFocus={this.props.onPasswordFocus}
                            onBlur={this.props.onPasswordBlur}
                            onKeyUp={this.props.passwordValidation}
                            onChange={(event) => {
                                this.props.onFormChange(event.target.name, event.target.value);
                                this.props.onHandleSamePassword(event);
                            }}
                            className="formAuthentication-input formAuthentication-input-secondLayer container"
                            placeholder="enter password"
                            type="password"
                            name="password"
                        />
                        <div style={this.props.showPasswordValidation ? { display: "block" } : { display: "none" }}>
                            <p className="alertPassword" style={this.props.formStatusPasswordValidation.containNumbers ? { color: "green" } : { color: "red" }}>
                                {" "}
                                <i className="fa-solid fa-circle-info"></i> contains number
                            </p>
                            <p className="alertPassword" style={this.props.formStatusPasswordValidation.minimumLength ? { color: "green" } : { color: "red" }}>
                                {" "}
                                <i className="fa-solid fa-circle-info"></i> minimum length
                            </p>
                            <p className="alertPassword" style={this.props.formStatusPasswordValidation.upperCaseLetters ? { color: "green" } : { color: "red" }}>
                                {" "}
                                <i className="fa-solid fa-circle-info"></i> uppercase
                            </p>
                            <p className="alertPassword" style={this.props.formStatusPasswordValidation.lowerCaseLetters ? { color: "green" } : { color: "red" }}>
                                {" "}
                                <i className="fa-solid fa-circle-info"></i> lowercase
                            </p>
                        </div>
                        <p className={this.props.statusPaswordValidation === false && this.props.showPasswordValidation === false && this.props.password !== "" ? "urgentPasswordNotRequirement" : "urgentPasswordNotRequirement-none"}>
                            <i className="fa-solid fa-circle-info"></i> password does not meet the requirements
                        </p>
                        <input
                            autoComplete="off"
                            required
                            onChange={(event) => {
                                this.props.onFormChange(event.target.name, event.target.value);
                                this.props.onHandleSamePassword(event);
                            }}
                            className="formAuthentication-input formAuthentication-input-secondLayer container"
                            placeholder="confirm password"
                            type="password"
                            name="verifyPassword"
                        />
                        <p className={this.props.statusSamePasswordVerify === false ? "urgentPassword" : "urgentPassword-none"}>
                            <i className="fa-solid fa-circle-info"></i> Password confirmation does not match Password
                        </p>
                        <br />
                        <div className="formAuthenticationSubmit-container">
                            <button type="submit" style={{ backgroundColor: "#6495ED" }}>
                                Next Form
                            </button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default Signupstep1;
