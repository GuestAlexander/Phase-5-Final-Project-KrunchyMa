import axios from "axios";
import {BASE_API_URL} from "./config";
import authHeader from "./auth-header";

const API_URL = `${BASE_API_URL}/tips/`;

const API_USER_URL = `${BASE_API_URL}/user/tips`;

const postTips = (desc) => {
    return axios.post(API_URL + "add", {desc}, {headers: authHeader()});
};

const getAllTips = () => {
    return axios.get(API_URL + "get", {headers: authHeader()});
};

const getByIdTips = (id) => {
    return axios.get(API_URL + `get/${id}`, {headers: authHeader()});
};

const updateTips = (id, desc) => {
    return axios.put(API_URL + `update/${id}`, {desc}, {headers: authHeader()});
};

const deleteTips = (id) => {
    return axios.delete(API_URL + `delete/${id}`, {headers: authHeader()});
};

const getMyTips = () => {
    return axios.get(API_USER_URL, {headers: authHeader()});
};

export default {
    postTips,
    getAllTips,
    getByIdTips,
    updateTips,
    deleteTips,
    getMyTips
};
