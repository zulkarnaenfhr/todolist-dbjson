import axios from "axios";

export const PutUserData = (linkRoot, path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${linkRoot}/${path}`, data).then(
            (result) => {
                resolve(result);
            },
            (err) => {
                reject(err);
            }
        );
    });
    return promise;
};
