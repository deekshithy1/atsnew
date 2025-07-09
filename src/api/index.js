import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api" // ✅ Must include http://
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const Login = (authData) => API.post("/auth/login", authData);
