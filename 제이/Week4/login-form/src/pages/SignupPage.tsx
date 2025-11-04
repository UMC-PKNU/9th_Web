import { useState } from "react";
import { validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import eyeClose from "../assets/eye-close.png";
import eyeOpen from "../assets/eye-open.png";
import { signup } from "../api/auth"; 
import {z} from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z.string().min(8, {
    message: "비밀번호는 8자 이상이어야 합니다.",
  })
  .max(20, {
    message: "비밀번호는 20자 이하여야 합니다.",
  }),
  passwordCheck: z.string().min(8, {
    message: "비밀번호는 8자 이상이어야 합니다.",
  })
  .max(20, {
    message: "비밀번호는 20자 이하여야 합니다.",
  }),
  name: z.string().min(1, {message:"이름을 입력해주세요."})
  })
  .refine((data) => data.password === data.passwordCheck, { // 비밀번호가 일치하지 않을 때
    message: "비밀번호가 일치하지 않습니다.",
    path:['passwordCheck'],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors , isSubmitting},
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

  const onSubmit:SubmitHandler<FormFields> = (data) => {
    const {passwordCheck, ...rest} = data;
    console.log(rest);
  };
  return <div className="flex flex-col items-center justify-center h-full gap-6">
      
      <div className="relative w-[300px]">
        <span
          className="absolute left-0 text-2xl cursor-pointer hover:text-[#807bff] transition"
          onClick={() => navigate("/")} // 이전 페이지 이동 
        >
          {"<"}
        </span>
        <h2 className="text-2xl font-semibold text-center">로그인</h2>
      </div>

      
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
          ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder={"이메일"}
        />
         {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}
        

        <input
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
          ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
         {errors.password && (
          <div className={"text-red-500 text-sm"}>{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
          ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호 확인"
        />
         {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>
        )}
        

        <input
          {...register("name")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
          ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="name"
          placeholder="이름"
        />
         {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}
        
       
     

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>;
};

export default SignupPage;


