import React, { Component, createRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDateFormat, getDefaultDate } from "../../config/Date/Date";
import { API } from "../../service";
import "./HomepageSideNavbar.css";

class HomepageSideNavbarContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userProfile: [],
            statusLoadData: false,
            editProfile: false,
        };

        this.addcategory = this.addcategory.bind(this);
        this.handleToUpdateProfile = this.handleToUpdateProfile.bind(this);
        this.handleFormProfileUpdate = this.handleFormProfileUpdate.bind(this);
        this.handleSubmitUpdateProfile = this.handleSubmitUpdateProfile.bind(this);
    }

    handleToUpdateProfile = () => {
        this.setState({
            editProfile: !this.state.editProfile,
        });
    };

    handleFormProfileUpdate = (event) => {
        const userProfileNew = { ...this.state.userProfile };
        userProfileNew[event.target.name] = event.target.value;
        this.setState({
            userProfile: userProfileNew,
        });
    };

    handleSubmitUpdateProfile = () => {
        API.putUserData(this.state.userProfile.id, this.state.userProfile);
        this.setState({
            editProfile: false,
        });
    };

    addcategory = () => {
        let userProfileNew = { ...this.state.userProfile };
        userProfileNew.todo.kegiatan = [];
        console.log(userProfileNew.todo);
        console.log(userProfileNew);
        API.putUserData(this.state.userProfile.id, userProfileNew);
    };

    async componentDidMount() {
        await API.getUserData(this.props.data.state.username).then((data) => {
            this.setState({
                userProfile: data.data,
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
                        <div className="homepageSideNavbar-profile-container">
                            <button style={{ display: "flex" }} className="homepageSideNavbar-profile container" data-bs-toggle="collapse" href="#collapseExample">
                                <img className="profile-photo" src="https://i.ibb.co/zPp1Zrh/Profile-Pictures.jpg" alt="Profile-Pictures" border="0"></img>
                                <p className="account-name">{this.state.userProfile.name}</p>{" "}
                            </button>
                            <div className="collapse" id="collapseExample">
                                <button onClick={this.handleToUpdateProfile} className="buttonEditProfile">
                                    Edit Profile
                                </button>
                                {this.state.editProfile === false ? (
                                    <div className="profileData">
                                        <table>
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <th>Id </th>
                                                    <th>:</th>
                                                    <th>{this.state.userProfile.id}</th>
                                                </tr>
                                                <tr>
                                                    <th>Name </th>
                                                    <th>:</th>
                                                    <th>{this.state.userProfile.name}</th>
                                                </tr>
                                                <tr>
                                                    <th>Profession </th>
                                                    <th>:</th>
                                                    <th>{this.state.userProfile.profession}</th>
                                                </tr>
                                                <tr>
                                                    <th>Place of Birth </th>
                                                    <th>:</th>
                                                    <th>{this.state.userProfile.placeofbirth}</th>
                                                </tr>
                                                <tr>
                                                    <th>Date of Birth </th>
                                                    <th>:</th>
                                                    <th>{getDateFormat(this.state.userProfile.dateofbirth)}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="editProfileData">
                                        <table>
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <th>Id </th>
                                                    <th>:</th>
                                                    <th>{this.state.userProfile.id}</th>
                                                </tr>
                                                <tr>
                                                    <th>Name </th>
                                                    <th>:</th>
                                                    <th>
                                                        <input onChange={this.handleFormProfileUpdate} type="text" name="name" value={this.state.userProfile.name} />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Profession </th>
                                                    <th>:</th>
                                                    <th>
                                                        <input onChange={this.handleFormProfileUpdate} type="text" name="profession" value={this.state.userProfile.profession} />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Place of Birth </th>
                                                    <th>:</th>
                                                    <th>
                                                        <input onChange={this.handleFormProfileUpdate} type="text" name="placeofbirth" value={this.state.userProfile.placeofbirth} />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Date of Birth </th>
                                                    <th>:</th>
                                                    <th>
                                                        <input onChange={this.handleFormProfileUpdate} type="date" name="dateofbirth" value={getDefaultDate(this.state.userProfile.dateofbirth)} />
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button onClick={this.handleSubmitUpdateProfile}>submit</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="homepageSideNavbar-menu">
                            <p>masuk</p>
                            <Link ref={this.buttonHiddenTriggerNotLogin} to={`/todolist-dbjson/`}>
                                <button>Logout</button>
                            </Link>
                        </div>
                        <button
                            onClick={() => {
                                console.log(this.state.userProfile);
                            }}
                        >
                            cek state
                        </button>
                        <button onClick={this.addcategory}>add category</button>
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
