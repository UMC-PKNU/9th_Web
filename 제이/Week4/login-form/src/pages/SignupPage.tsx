import { useState } from "react";
import { validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import eyeClose from "../assets/eye-close.png";
import eyeOpen from "../assets/eye-open.png";
import { signup } from "../api/auth"; // 회원가입 api

const SignupPage = () => {
  // 입력값 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 단계 (1단계: 이메일 입력, 2단계: 비밀번호 입력)
  const [step, setStep] = useState(1);

  // 에러 및 시각적 토글 상태
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 이메일 검증 후 다음 단계로 전환
  const handleNextStep = () => {
    const validation = validateSignin({ email, password: "" });

    if (validation.email) {
      setError(validation.email);
      return;
    }

    setError("");
    setStep(2);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const validation = validateSignin({ email, password });

    if (validation.password) {
      setError(validation.password);
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    // 회원가입 API 요청
    try {

    }

    setError("");
    alert("회원가입 완료!");
  };

  // 버튼 활성화 조건
  const isDisabled =
    !email ||
    !password ||
    !confirmPassword ||
    error.length > 0 ||
    password !== confirmPassword ||
    password.length < 8;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-2xl font-semibold mb-6 tracking-wide">회원가입</h2>

      {/* 1️⃣ 이메일 입력 단계 */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요!"
            className="border border-gray-600 bg-black text-white w-[300px] p-[10px] rounded-sm focus:border-pink-500 focus:outline-none transition-colors duration-200"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button
            onClick={handleNextStep}
            disabled={!email || error.length > 0}
            className={`w-[300px] mt-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${
              !email || error.length > 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            다음
          </button>
        </div>
      )}

      {/*비밀번호 입력 단계 */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-3">
          {/* 이메일 표시 */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <span>📧</span>
            <span>{email}</span>
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요!"
              className="border border-gray-600 bg-black text-white w-[300px] p-[10px] rounded-sm focus:border-pink-500 focus:outline-none transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors"
            >
              <img
                src={showPassword ? eyeClose : eyeOpen}
                alt="비밀번호 보기"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* 비밀번호 재입력 */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              className="border border-gray-600 bg-black text-white w-[300px] p-[10px] rounded-sm focus:border-pink-500 focus:outline-none transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors"
            >
              <img
                src={showConfirmPassword ? eyeClose : eyeOpen}
                alt="비밀번호 보기"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 다음 버튼 */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`w-[300px] mt-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${
              isDisabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
