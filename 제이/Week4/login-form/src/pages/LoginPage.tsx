import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { signin } from "../api/auth"; // 로그인 API

const LoginPage = () => {
  const navigate = useNavigate(); // 페이지 이동용
  const { getInputProps, errors, touched, values } =
    useForm<UserSignInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  // 일반 로그인
  const handleSubmit = async () => {
    try {
      await signin({ email: values.email, password: values.password });
      // 로그인 성공 시 -> 마이페이지 이동
      navigate("/my");
    } catch (error) {
      // 로그인 실패 시
      alert("로그인 실패");
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  // 구글 로그인 (아직 기능 없음)
  const handleGoogleClick = () => {
    alert("구글 로그인");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="relative w-[300px]">
        <span
          className="absolute left-0 text-2xl cursor-pointer hover:text-[#807bff] transition"
          onClick={() => navigate("/")} // 이전 페이지 이동
        >
          {"<"}
        </span>
        <h2 className="text-2xl font-semibold text-center">로그인</h2>
      </div>

      <div className="flex flex-col gap-3 items-center">
        {/* 🔹 구글 로그인 버튼 */}
        <button
          onClick={handleGoogleClick}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 w-[300px] hover:bg-gray-50 transition shadow-sm"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">
            Google 계정으로 로그인
          </span>
        </button>

        {/* 🔹 구분선 */}
        <div className="flex items-center justify-center my-2 w-full">
          <div className="h-[1px] bg-gray-300 w-[100px]" />
          <span className="text-gray-500 text-sm mx-2">또는</span>
          <div className="h-[1px] bg-gray-300 w-[100px]" />
        </div>

        {/* 🔹 일반 로그인 입력 폼 */}
        <div className="flex flex-col gap-3">
          <input
            {...getInputProps("email")}
            name="email"
            className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
            type="email"
            placeholder="이메일"
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            {...getInputProps("password")}
            name="password"
            className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
            type="password"
            placeholder="비밀번호"
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
