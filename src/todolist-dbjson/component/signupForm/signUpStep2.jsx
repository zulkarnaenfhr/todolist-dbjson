import React, { Component } from "react";
import "../../container/pages/authentication/authentication.css";

class Signupstep2 extends Component {
    render() {
        return (
            <div>
                {this.props.formStep !== 2 ? (
                    ""
                ) : (
                    <form action="" onSubmit={(event) => this.props.handleForm2Submit(event)}>
                        <input
                            autoComplete="off"
                            required
                            className="formAuthentication-input container"
                            placeholder="enter name"
                            type="text"
                            name="name"
                            value={this.props.name}
                            onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)}
                        />
                        <input
                            autoComplete="off"
                            required
                            className="formAuthentication-input formAuthentication-input-secondLayer container"
                            placeholder="enter place of birth"
                            type="text"
                            name="placeofbirth"
                            value={this.props.placeofbirth}
                            onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)}
                        />
                        <input
                            placeholder="input date of birth"
                            className="formAuthentication-date formAuthentication-input-secondLayer container"
                            type="date"
                            name="dateofbirth"
                            required
                            value={this.props.dateofbirth}
                            onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)}
                        />
                        <select required className="formAuthentication-input-secondLayer formAuthentication-select" onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)} name="profession" id="">
                            <option value="">pilih pekerjaan</option>
                            {this.props.professionCategory.map((profession) => (
                                <option value={profession}>{profession}</option>
                            ))}
                        </select>
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

export default Signupstep2;
