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
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

    handleCategoryChange = (event) => {
        // this.props.onCategoryChange((event)=> )
        this.props.onCategoryChange(event.target.name);
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
                                <p className="profile-name">{this.state.userProfile.name}</p>{" "}
                            </button>
                            <div className="collapse profile-data-container container" id="collapseExample">
                                <button onClick={this.handleToUpdateProfile} className="buttonEditProfile">
                                    Edit Profile
                                </button>
                                {this.state.editProfile === false ? (
                                    <div className="profileData">
                                        <table className="tableProfileData">
                                            <thead></thead>
                                            <tbody>
                                                <tr className="profile-data-table-row">
                                                    <td>Id </td>
                                                    <td>:</td>
                                                    <td>{this.state.userProfile.id}</td>
                                                </tr>
                                                <tr className="profile-data-table-row">
                                                    <td>Name </td>
                                                    <td>:</td>
                                                    <td>{this.state.userProfile.name}</td>
                                                </tr>
                                                <tr className="profile-data-table-row">
                                                    <td>Profession </td>
                                                    <td>:</td>
                                                    <td>{this.state.userProfile.profession}</td>
                                                </tr>
                                                <tr className="profile-data-table-row">
                                                    <td>Place of Birth </td>
                                                    <td>:</td>
                                                    <td>{this.state.userProfile.placeofbirth}</td>
                                                </tr>
                                                <tr className="profile-data-table-row">
                                                    <td>Date of Birth </td>
                                                    <td>:</td>
                                                    <td>{getDateFormat(this.state.userProfile.dateofbirth)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="editProfileData">
                                        <table className="tableProfileData">
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Id </td>
                                                    <td>:</td>
                                                    <td>{this.state.userProfile.id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Name </td>
                                                    <td>:</td>
                                                    <td>
                                                        <input onChange={this.handleFormProfileUpdate} type="text" name="name" value={this.state.userProfile.name} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Profession </td>
                                                    <td>:</td>
                                                    <td>
                                                        <input onChange={this.handleFormProfileUpdate} type="text" name="profession" value={this.state.userProfile.profession} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Place of Birth </td>
                                                    <td>:</td>
                                                    <td>
                                                        <input onChange={this.handleFormProfileUpdate} type="text" name="placeofbirth" value={this.state.userProfile.placeofbirth} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Date of Birth </td>
                                                    <td>:</td>
                                                    <td>
                                                        <input onChange={this.handleFormProfileUpdate} type="date" name="dateofbirth" value={getDefaultDate(this.state.userProfile.dateofbirth)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* pindah button ke kanan */}
                                        <button onClick={this.handleSubmitUpdateProfile}>submit</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="homepageSideNavbar-category-container">
                            {Object.keys(this.state.userProfile.todo).map((category) => (
                                <button onClick={this.handleCategoryChange} name={category} key={category} className="homepageSideNavbar-category-button">
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="homepageSideNavbar-menu">
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
    return <HomepageSideNavbarContainer onCategoryChange={(category) => props.onCategoryChange(category)} data={props.data} />;
};

export default Homepagesidenavbar;
