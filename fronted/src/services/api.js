import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/polizas", 
});

export default api;
