import React from "react";
import { useLocation } from "react-router-dom";

const Homepage = (props) => {
    const location = useLocation();

    return (
        <div>
            <h1>masuk homepage</h1>
            <button
                onClick={() => {
                    console.log(location);
                }}
            >
                cek click
            </button>
        </div>
    );
};

export default Homepage;
