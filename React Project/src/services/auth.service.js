import axios from "axios";
import {BASE_API_URL} from "./config";

const API_URL = `${BASE_API_URL}/user/`;

const register = (username, password) => {
    return axios.post(API_URL + "signup", {
        username,
        password
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
