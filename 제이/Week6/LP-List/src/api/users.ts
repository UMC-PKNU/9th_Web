import instance from "./axios";

// 내 정보 조회 API
export const getMyInfo = async () => {
  const response = await instance.get("/users/me");
  return response.data;
};

// 토큰 인증
export const verifyToken = async () => {
  return instance.get("/auth/protected"); 
};