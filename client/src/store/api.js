import axios from "axios";

export const URL = "http://localhost:5000";
const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signin = (data) => API.post("/api/users/signin", data);
export const register = (data) => API.post("/api/users/register", data);

export const createRoom = (data) => API.post("/api/rooms", data);
export const sendMessageRoom = (data) => API.post("/api/rooms", data);
export const getRoom = (roomID) => API.get(`/api/rooms/${roomID}`);
export const deleteRoom = (roomID, username) =>
  API.delete(`/api/rooms/${roomID}/${username}`);
