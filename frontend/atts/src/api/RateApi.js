import axios from "axios";


const API_URL = "https://atts-metalrate.onrender.com/api/rates";


export const getRates = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};


export const addRate = async (rateData) => {
  const res = await axios.post(API_URL, rateData);
  return res.data;
};

export const getRatesByMetalAndPurity = async(metal, purity) =>{
  axios.get(`${API_URL}?metal=${metal}&purity=${purity}`)};

export const getLatestRate = async (metal, purity) => {
  const params = {};
  if (metal) params.metal = metal;
  if (purity) params.purity = purity;

  const res = await axios.get(`${API_URL}/latest`, { params });
  return res.data;
};
