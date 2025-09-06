import axios from "axios";

const api = axios.create({ baseURL: "https://atts-metalrate.onrender.com"});

export default api;
