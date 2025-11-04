// 로그인 페이지 접근 권한
import { Navigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { getMyInfo, verifyToken } from "../api/users";
import type { ReactElement } from "react";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verifyToken(); // 토큰 유효성 검사
        await getMyInfo(); // 서버에 실제로 내 정보 요청
        setIsAllowed(true); // 성공 → 로그인됨
      } catch (error) {
        setIsAllowed(false); // 실패 → 로그인 페이지로 리다이렉트
      }
    };
    checkAuth();
  }, []);

  if (isAllowed === null) return <div>로딩 중...</div>;
  if (!isAllowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
