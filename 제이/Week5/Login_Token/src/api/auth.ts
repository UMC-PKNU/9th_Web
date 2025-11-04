import instance from "./axios";
// 응답 구조에 맞게 구현하기

// 회원가입 API
export const signup = async ( data: {
  name:string;
  email:string;
  password: string;
  bio: string;
  avatar: string;
}) => {
  const response = await instance.post("/auth/signup", data);
  return response.data;
};

// 로그인 API
export const signin = async ( data: {
  email: string;
  password: string;
}) => {
  const response = await instance.post("/auth/signin", data);

  const accessToken = response.data?.data?.accessToken;
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  
  return response.data;
};