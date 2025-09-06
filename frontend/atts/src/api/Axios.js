import axios from "axios";

const api = axios.create({ baseURL: "https://atts-metalrate.onrender.com/api"});

export default api;
