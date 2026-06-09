import axios from "axios";

const API = axios.create({
  baseURL: "https://post-management-app-i9vh.onrender.com/",
});

export default API;