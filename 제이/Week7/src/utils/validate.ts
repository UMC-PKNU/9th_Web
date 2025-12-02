// 검증
export type UserSignInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSignInformation) {
  const errors = {
    email: "",
    password: "",
  };
  
  // 이메일
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email,
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 비밀번호 
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }
  
  return errors;
}

function validateSignin(values: UserSignInformation) {
  return validateUser(values);
}

export { validateSignin };
