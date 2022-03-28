import axios from "axios";

export const GetUserData = (linkRoot, path, username) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${linkRoot}/${path}/${username}`).then(
            (data) => {
                resolve(data);
            },
            (err) => {
                reject(err);
            }
        );
    });
    return promise;
};
