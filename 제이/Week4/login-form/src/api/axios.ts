// 서버와 통신하는 공통 => 모든 API 요청 
// src/api/axiosInstance.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/v1", // 백엔드 서버 주소 
  withCredentials: true, // 쿠키가 필요할 때 true 
});

// 매번 요청 보낼 때 토큰을 자동으로 header에 붙임
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
