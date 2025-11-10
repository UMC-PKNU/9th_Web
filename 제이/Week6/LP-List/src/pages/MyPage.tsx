import { useEffect, useState } from "react";
import instance from "../api/axios";


// 마이페이지 내 정보 조회 API 호출
export const getMyInfo = async() => {
  const response = await instance.get("/users/me");
  return response.data.data;
}

const MyPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getMyInfo();
      setUser(data);
    })();
  }, []);

  if (!user) return <div>로딩 중...</div>;
  
  return (
    <div>
      <h1>마이페이지</h1>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
      <p>가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button className = "w-full bg-pink-600 rounded-md">로그아웃</button>
    </div>
  );
};

export default MyPage;
