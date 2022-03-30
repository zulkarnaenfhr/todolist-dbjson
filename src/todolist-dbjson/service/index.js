import { GetAllProfessionCategory } from "./Profession Category/getAllProfessionCategory";
import { GetUserData } from "./Users Data/getUserData";
import { Post } from "./Users Data/postsUserData";
import { PutUserData } from "./Users Data/putUserData";

const RootPath = "http://localhost:1414";
const userData = "userData";
const professionCategory = "professioncategory";

const postUserData = (data) => Post(RootPath, userData, data);
const getUserData = (userName) => GetUserData(RootPath, userData, userName);
const putUserData = (id, data) => PutUserData(RootPath, `${userData}/${id}`, data);
const getAllProfessionCategory = () => GetAllProfessionCategory(RootPath, professionCategory);

export const API = {
    postUserData,
    getUserData,
    putUserData,
    getAllProfessionCategory,
};
