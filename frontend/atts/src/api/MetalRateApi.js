import api from "./Axios";

export const createRate = (data) => api.post("/rates", data);
export const getRates = (params) => api.get("/rates", { params });
export const getLatestRate = (params) => api.get("/rates/latest", { params });
