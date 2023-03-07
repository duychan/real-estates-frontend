import axios from "axios";

const userToken = localStorage.getItem("loginToken");

const BaseApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL ?? ""}/api/v1`,
    headers: {
        Authorization: `Bearer ${userToken as string}`
    }
});

export default BaseApi;
