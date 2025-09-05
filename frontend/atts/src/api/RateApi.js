import axios from "axios";

const API_URL = "http://localhost:3000/api/rates";

export const getRates = () => axios.get(API_URL);
export const getRatesByMetalAndPurity = (metal, purity) =>
  axios.get(`${API_URL}?metal=${metal}&purity=${purity}`);
export const createRate = (data) => axios.post(API_URL, data);
