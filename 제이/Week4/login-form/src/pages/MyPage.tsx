import { useEffect, useState } from "react";
import { getMyInfo } from "../api/users";

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
      <p>이름: {user.nickname}</p>
      <p>이메일: {user.email}</p>
      <p>가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default MyPage;
