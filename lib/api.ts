import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

// Lost Items
export const lostAPI = {
  createLostItem: (data: FormData) =>
    api.post("/lost", data, { headers: { "Content-Type": "multipart/form-data" } }),
  getLostItems: (params?: { search?: string; category?: string }) =>
    api.get("/lost", { params }),
  getLostItemById: (id: string) => api.get(`/lost/${id}`),
  updateLostItem: (id: string, data: FormData) =>
    api.put(`/lost/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteLostItem: (id: string) => api.delete(`/lost/${id}`),
};

// Found Items
export const foundAPI = {
  createFoundItem: (data: FormData) =>
    api.post("/found", data, { headers: { "Content-Type": "multipart/form-data" } }),
  getFoundItems: (params?: { search?: string; category?: string }) =>
    api.get("/found", { params }),
  getFoundItemById: (id: string) => api.get(`/found/${id}`),
};

// Match Requests
export const matchAPI = {
  sendMatchRequest: (data: { itemId: string; message?: string }) =>
    api.post("/match/request", data),
  approveMatch: (id: string) => api.post(`/match/${id}/approve`),
  rejectMatch: (id: string) => api.post(`/match/${id}/reject`),
};

export default api;
