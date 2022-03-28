import axios from "axios";
import { GetUserData } from "./Users Data/getUserData";
import { Post } from "./Users Data/postsUserData";

const RootPath = "http://localhost:1414";
const userData = "userData";

const postUserData = (data) => Post(RootPath, userData, data);
const getUserData = (userName) => GetUserData(RootPath, userData, userName);

export const API = {
    postUserData,
    getUserData,
};
