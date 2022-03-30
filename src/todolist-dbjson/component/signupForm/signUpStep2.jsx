import React, { Component } from "react";

class Signupstep2 extends Component {
    render() {
        return (
            <div>
                {this.props.formStep !== 2 ? (
                    ""
                ) : (
                    <form action="">
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
                            className="formAuthentication-input container"
                            placeholder="enter place of birth"
                            type="text"
                            name="placeofbirth"
                            value={this.props.placeofbirth}
                            onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)}
                        />
                        <input type="date" name="dateofbirth" required value={this.props.dateofbirth} onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)} />
                        <select onChange={(event) => this.props.handleFormChange(event.target.name, event.target.value)} name="profession" id="">
                            <option value="">pilih pekerjaan</option>
                            {this.props.professionCategory.map((profession) => (
                                <option value={profession}>{profession}</option>
                            ))}
                        </select>
                        <button
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.cekState();
                            }}
                        >
                            maman
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export default Signupstep2;
