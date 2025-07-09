import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((req) => {
  const authStorage = localStorage.getItem("auth-storage");
  if (authStorage) {
    const parsed = JSON.parse(authStorage);
    const token = parsed?.state?.user?.token;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Auth header set:", token);
    }
  }
  return req;
});

export const addVehicle = (vehicleData) => API.post("/vehicles", vehicleData);

export const Fetchvehicles=()=>API.get("/vehicles/today")
export const Login = (authData) => API.post("/auth/login", authData);
