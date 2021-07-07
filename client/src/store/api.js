import axios from "axios";

const API = axios.create({ baseURL: "https://room-app-server.herokuapp.com/" });

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
