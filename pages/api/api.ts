import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:6969"
})
export const api_path = "http://localhost:6969"