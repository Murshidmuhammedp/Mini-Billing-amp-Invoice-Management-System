import axios from "axios";

const customAxios = axios.create({
    baseURL: "http://localhost:4567"
});


export default customAxios;