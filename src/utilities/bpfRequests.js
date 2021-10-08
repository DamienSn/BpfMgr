import axios from "axios";

const getBpfNumber = (userId, callback) => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}bpf/get/all_by_user`,
        params: {
            id: userId,
        },
        withCredentials: true,
    })
        .then((res) => {
            const data = res.data.data;
            callback(data.length);
        })
        .catch((err) => console.log(err));
};

const getLatestsBpfs = (userId, callback) => {
        axios({
            method: "get",
            url: `${import.meta.env.VITE_API_URL}bpf/get/all_by_user`,
            params: {
                id: userId,
            },
            withCredentials: true,
        })
            .then((res) => {
                const data = res.data.data;
                // Sort data by date
                const sortedData = data.sort((a, b) => new Date(b.bpf_date) - new Date(a.bpf_date));

                callback(sortedData.slice(0, 3));
            })
            .catch((err) => err);
};

const getAllBpfs = (userId, callback) => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}bpf/get/all_by_user`,
        params: {
            id: userId,
        },
        withCredentials: true,
    })
        .then((res) => {
            callback(res.data.data == undefined ? [] : res.data.data);
        })
        .catch((err) => console.log(err));
};

const getAllBcns = (userId, callback) => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}bcn/get/all_by_user`,
        params: {
            id: userId,
        },
        withCredentials: true,
    })
        .then((res) => {
            callback(res.data.data == undefined ? [] : res.data.data);
        })
        .catch((err) => console.log(err));
};

const getAllCities = (callback) => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}cities/all`,
        withCredentials: true,
    })
        .then((res) => {
            callback(res.data.data == undefined ? [] : res.data.data);
        })
        .catch((err) => console.log(err));
};

export { getBpfNumber, getLatestsBpfs, getAllBpfs, getAllBcns, getAllCities };
