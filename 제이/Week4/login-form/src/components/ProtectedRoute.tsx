// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { getMyInfo } from "../api/users";
import type { ReactElement } from "react";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMyInfo(); // 서버에 실제로 내 정보 요청
        setIsAllowed(true); // 성공 → 로그인됨
      } catch (error) {
        setIsAllowed(false); // 실패 → 로그인 안 됨
      }
    };
    checkAuth();
  }, []);

  if (isAllowed === null) return <div>로딩 중...</div>;
  if (!isAllowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
