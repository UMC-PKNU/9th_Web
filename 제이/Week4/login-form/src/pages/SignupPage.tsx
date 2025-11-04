import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "../api/axios";
import eyeClose from "../assets/eye-close.png";
import eyeOpen from "../assets/eye-open.png";

// 회원가입 API
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
}) => {
  const response = await instance.post("/auth/signup", data);
  return response.data;
};

// zod 유효성 검사 스키마
const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;

    try {
      const result = await signup({
        ...rest,
        bio: "",
        avatar: "",
      });
      console.log("회원가입 성공:", result);
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="relative w-[300px]">
        <span
          className="absolute left-0 text-2xl cursor-pointer hover:text-[#807bff] transition"
          onClick={() => navigate("/")}
        >
          {"<"}
        </span>
        <h2 className="text-2xl font-semibold text-center">회원가입</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-[300px]"
      >
        <input
          {...register("email")}
          className={`border w-full p-[10px] rounded-sm focus:border-[#807bff] ${
            errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        {/* 비밀번호 */}
        <div className="relative">
          <input
            {...register("password")}
            className={`border w-full p-[10px] rounded-sm focus:border-[#807bff] ${
              errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
          />
          <img
            src={showPassword ? eyeOpen : eyeClose}
            alt="toggle password"
            className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        {/* 비밀번호 확인 */}
        <div className="relative">
          <input
            {...register("passwordCheck")}
            className={`border w-full p-[10px] rounded-sm focus:border-[#807bff] ${
              errors?.passwordCheck
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
            type={showPasswordCheck ? "text" : "password"}
            placeholder="비밀번호 확인"
          />
          <img
            src={showPasswordCheck ? eyeOpen : eyeClose}
            alt="toggle password check"
            className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
            onClick={() => setShowPasswordCheck((prev) => !prev)}
          />
        </div>
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        {/* 이름 */}
        <input
          {...register("name")}
          className={`border w-full p-[10px] rounded-sm focus:border-[#807bff] ${
            errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="text"
          placeholder="이름"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        {/* 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
