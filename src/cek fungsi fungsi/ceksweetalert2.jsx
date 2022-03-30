import React, { Component } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class Ceksweetalert2 extends Component {
    handleClick = async () => {
        const MySwal = withReactContent(Swal);

        await MySwal.fire({
            icon: "success",
            title: "<strong>Successful Registration!</strong>",
            footer: "<p>Please Login, with your account</p>",
            timer: "3000",
        });
    };

    render() {
        return (
            <div>
                <h1>masuk</h1>
                <button onClick={this.handleClick}>cek swal</button>
            </div>
        );
    }
}

export default Ceksweetalert2;
