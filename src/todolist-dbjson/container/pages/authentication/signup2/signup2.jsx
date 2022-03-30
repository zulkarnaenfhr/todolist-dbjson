import React, { Component } from "react";

class Signup2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 1,
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
        };
    }

    render() {
        return (
            <form action="">
                <input type="text" name="" id="" />
            </form>
        );
    }
}

export default Signup2;
