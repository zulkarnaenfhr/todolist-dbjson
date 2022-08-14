import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import Homepagesidenavbar from "../../../component/Homepage-SideNavbar/HomepageSideNavbar";
import "./Homepage.css";

class HomepageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: "",
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleCategoryChange = (category) => {
        this.setState({
            category: category,
        });
    };

    render() {
        return (
            <div id="Homepage">
                <div className="HomepageSideNavbar-container">
                    <Homepagesidenavbar onCategoryChange={(category) => this.handleCategoryChange(category)} data={this.props.data} />
                </div>
                <div className="HomepageContent-container">
                    <h1>masuk container</h1>
                    <h1>Categorynya adalah : {this.state.category}</h1>
                </div>
            </div>
        );
    }
}

const Homepage = (props) => {
    const location = useLocation();

    return <HomepageContainer data={location} />;
};

export default Homepage;
