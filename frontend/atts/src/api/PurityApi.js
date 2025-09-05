import api from "./Axios";

export const getPurities = () => api.get("/purities");
export const createPurity = (data) => api.post("/purities", data);
export const updatePurity = (id, data) => api.put(`/purities/${id}`, data);
export const deletePurity = (id) => api.delete(`/purities/${id}`);
