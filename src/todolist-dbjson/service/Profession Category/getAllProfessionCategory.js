import axios from "axios";

export const GetAllProfessionCategory = (linkRoot, path) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${linkRoot}/${path}`).then(
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
