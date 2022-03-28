import axios from "axios";

export const Post = (linkRoot, path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${linkRoot}/${path}`, data).then(
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
