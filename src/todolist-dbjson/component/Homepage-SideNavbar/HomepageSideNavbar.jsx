import React, { Component } from "react";
import "./HomepageSideNavbar.css";

class Homepagesidenavbar extends Component {
    render() {
        return (
            <div id="homepageSideNavbar">
                <div className="homepageSideNavbar-profile-container">
                    <p>masuk profile</p>
                </div>
                <div className="homepageSideNavbar-menu">
                    <p>masuk</p>
                    <button>Home</button>
                </div>
            </div>
        );
    }
}

export default Homepagesidenavbar;
