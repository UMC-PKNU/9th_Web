import { useEffect, useState } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";



// 마이페이지 내 정보 조회 API 호출
export const getMyInfo = async() => {
  const response = await instance.get("/users/me");
  return response.data.data;
}

const MyPage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const {  removeItem } = useLocalStorage("accessToken");

  useEffect(() => {
    (async () => {
      const data = await getMyInfo();
      setUser(data);
    })();
  }, []);

  const handleLogout = () => {
    removeItem(); //토큰 삭제
    navigate("/login"); // 로그아웃 시 로그인 페이지로 이동
    
  }

  if (!user) return <div>로딩 중...</div>;
  
  return (
    <div>
      <h1>마이페이지</h1>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
      <p>가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button 
      onClick={handleLogout}
      className = "w-full bg-pink-600 rounded-md">
        로그아웃</button>
    </div>
  );
};

export default MyPage;
