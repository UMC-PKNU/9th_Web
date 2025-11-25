import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyToken } from "../api/users";

const HomeLayout = () => {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인/회원가입 페이지는 인증 체크 제외
  const openPages = ["/login", "/signup"];

  useEffect(() => {
    // 로그인/회원가입 페이지일 경우 verifyToken 실행 
    if (openPages.includes(location.pathname)) {
      setAuthChecked(true);
      setIsLogin(false); // 이 페이지에서는 로그인 여부 체크 안 함
      return;
    }

    // verifyToken 실행
    const check = async () => {
      try {
        await verifyToken();
        setIsLogin(true);
      } catch (e) {
        setIsLogin(false);
      }
      setAuthChecked(true);
    };

    check();
  }, [location.pathname]); 
  // location.pathname을 deps로 넣어야 페이지 이동 시 재검사 됨

  if (!authChecked) return <div>로딩 중...</div>;

  // 보호 페이지인데 로그인 안 된 경우 → 로그인으로 이동
  if (!openPages.includes(location.pathname) && !isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-black">
      <header className="w-full bg-black text-white flex justify-between items-center px-8 py-4 border-b border-gray-400">
        <h1 className="text-pink-500 font-bold text-xl">
          <Link to="/">홈페이지</Link>
        </h1>

        <div className="flex gap-3">
          {!isLogin ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 bg-pink-600 rounded hover:bg-pink-700 transition"
              >
                회원가입
              </Link>
            </>
          ) : (
            <span>로그인됨</span>
          )}
        </div>
      </header>

      <main className="flex-1 flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
