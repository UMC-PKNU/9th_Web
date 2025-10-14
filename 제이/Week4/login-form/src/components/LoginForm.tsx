import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    setError("");
    console.log("로그인 시도:", email, password);
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div className="input-wrapper">
        <div>로그인</div>
        <FormInput
          type="email"
          placeholder="이메일을 입력해주세요!"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); 
          }}
        />
        {error && <p className="error-text">{error}</p>}
      </div>

      <FormInput
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button text="로그인" />
    </form>
  );
}
