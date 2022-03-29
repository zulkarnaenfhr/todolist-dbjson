import React, { Component, createRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../service";
import "./HomepageSideNavbar.css";

class HomepageSideNavbarContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataPengguna: [],
            statusLoadData: false,
        };
    }

    async componentDidMount() {
        await API.getUserData(this.props.data.state.username).then((data) => {
            this.setState({
                dataPengguna: data.data,
                statusLoadData: true,
            });
        });
    }
    render() {
        return (
            <div id="homepageSideNavbar">
                {this.state.statusLoadData === false ? (
                    <div>
                        <p>load data</p>
                    </div>
                ) : (
                    <div>
                        <div className="homepageSideNavbar-profile-container container" style={{ display: "flex" }}>
                            <img className="profile-photo" src="https://i.ibb.co/zPp1Zrh/Profile-Pictures.jpg" alt="Profile-Pictures" border="0"></img>
                            <p className="account-name">{this.state.dataPengguna.nama}</p>
                        </div>
                        <div className="homepageSideNavbar-menu">
                            <p>masuk</p>
                            <Link ref={this.buttonHiddenTriggerNotLogin} to={`/todolist-dbjson/`}>
                                <button>Logout</button>
                            </Link>
                        </div>
                        <button
                            onClick={() => {
                                console.log(this.state.dataPengguna);
                            }}
                        >
                            cek state
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const Homepagesidenavbar = (props) => {
    // const history = useHistory();
    const navigate = useNavigate();
    useEffect(() => {
        if (props.data.state === null) {
            navigate(`/todolist-dbjson/`);
        }
    }, []);
    return <HomepageSideNavbarContainer data={props.data} />;
};

export default Homepagesidenavbar;
