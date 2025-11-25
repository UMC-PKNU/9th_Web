import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  nickname: string | null;
  login: (token: string, nickname: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(null);

  // 앱이 켜질 때 localStorage에서 초기값 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("nickname");

    if (token) {
      setIsLoggedIn(true);
      setNickname(name);
    }
  }, []);

  // 로그인 함수
  const login = (token: string, nickname: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("nickname", nickname);

    setIsLoggedIn(true);
    setNickname(nickname);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");

    setIsLoggedIn(false);
    setNickname(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        nickname,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
