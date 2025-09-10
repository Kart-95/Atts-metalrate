import api from "./Axios";

export const getRates = () => api.get("/rates");

export const createRate = (data) => api.post("/rates", data);

export const getLatestRate = (metal, purity) => {
  const params = {};
  if (metal) params.metal = metal;
  if (purity) params.purity = purity;

  return api.get("/rates/latest", { params });
};
