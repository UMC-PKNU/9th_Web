import axios from "axios";

// 서버와 통신하는 공통 => 모든 API 요청 
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

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 시
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (err) {
          isRefreshing = false;
          // refresh 실패 시 → 로그인 페이지로 이동
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      // refresh가 완료되면 대기 중인 요청들 재시도
      return new Promise((resolve) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
