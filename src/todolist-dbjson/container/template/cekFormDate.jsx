import React, { Component } from "react";

class Cekformdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
        };
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
    }

    handleDateSubmit = (event) => {
        let date = new Date(event.target.value);
        const months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
        };
        let day = date.getDate();
        let year = date.getFullYear();
        const monthName = months[date.getMonth()];
        const tanggal = `${day}/${monthName}/${year}`;
        const tanggal2 = new Date(tanggal);
        console.log(tanggal);
        console.log(tanggal2);
    };

    render() {
        return (
            <div>
                <p>masuk form date</p>
                <form action="">
                    <input onChange={this.handleDateSubmit} type="date" name="" id="" />
                    <button type="submit">submit date</button>
                </form>
                <button>tampilkan date</button>
            </div>
        );
    }
}

export default Cekformdate;
