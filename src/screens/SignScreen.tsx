import styled from "styled-components";
import { useState } from "react";
import { useMyAuth } from "../contexts/AuthContext";

// 화면 안에 Style을 가진 미니 컴포넌트
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 50px;

  background-color: ivory;
`;

// 왼쪽 사이드
const Logo = styled.img``;

// 오른쪽 사이드
const SignInBox = styled.div``;
const Form = styled.form``;
const FormTitle = styled.p``;
const Input = styled.input``;

// 버튼들
const Footer = styled.div``;
const Btn = styled.div``;

// Type
type InputFieldType = "email" | "password";

// 로그인 화면을 구현할 컴포넌트
const SignInScreen = () => {
  // Id, Pw를 담아둘 데이터(State)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Loading 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 로그인 유저 상태 useMyAuth 훅에서 가져온다
  const { currentUser, signIn } = useMyAuth();

  // Input이 변경될 때 호출되는 함수
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Input 컴포넌트에 입력한 텍스트
    const inputText = event.target.value;

    // 1-A. Input 컴포넌트 입력 공간에 따라 텍스트 분류
    const inputName = event.target.name as InputFieldType;

    // 2. 입력한 텍스트를 State에 할당
    switch (inputName) {
      case "email":
        // 2-1. ID를 입력한 경우에는 email에만 할당
        setEmail(inputText);
        break;

      case "password":
        // 2-2. PW를 입력한 경우에는 PW에만 할당
        setPassword(inputText);
        break;
    }
  };

  // [로그인] 입력한 정보를 서버에 제출(비동기 처리)
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 0. 제출 시에, 화면 새로고침하지 않고 그대로 둠
    event.preventDefault();

    // 1. 점검(아무 값도 안씀, 최소 입력값, 비속어, 특수문자)
    if (loading) {
      return false;
    }

    if (email === "" || password === "") {
      alert("최소 1자리 이상 입력하셔야 합니다.");
      return;
    }

    // 2. 로딩 시작
    setLoading(true);

    try {
      // A. 로그인 처리 with Server ... API
      // Input Code: Call Your 'Server API'
      // async / await: 비동기 처리
      // await signinServer(email, password);

      // [@Test] 3초 이후에 로그인 여부 알려줌
      setTimeout(() => {
        // 로그인 성공 -> 로그인 처리
        signIn(email, password);

        // 로딩 종료
        setLoading(false);
      }, 3000);
    } catch (e) {
      // B. 로그인 실패(etc.. 잘못된 ID, 잘못된 비밀번호, 인터넷 문제)
    }

    // end. 로딩 종료
    // setLoading(false);
  };

  return (
    <Container>
      {/* 왼쪽(L) 사이드 */}
      <Logo style={{ width: 100, height: 100, backgroundColor: "green" }} />

      {/* 오른쪽(R) 사이드 */}
      <SignInBox>
        {/* Id, PW 입력 제출 */}
        <Form onSubmit={onSubmit}>
          <FormTitle>아이디 / 이메일</FormTitle>
          <Input
            name="email"
            type="email"
            placeholder="아이디를 입력하세요: "
            onChange={onChange}
          />
          <FormTitle>비밀번호</FormTitle>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요: "
            onChange={onChange}
          />
          {/* 로그인 버튼 역할의 Input */}
          <Input
            type="submit"
            value={loading ? "로그인 중..." : "로그인하기"}
          />
        </Form>
        {/* 하단: 버튼(회원가입, 비밀번호 찾기 등) */}
        <Footer>
          <Btn style={{ width: 100, height: 50, backgroundColor: "red" }} />
          <Btn style={{ width: 100, height: 50, backgroundColor: "blue" }} />
        </Footer>
      </SignInBox>
    </Container>
  );
};

export default SignInScreen;
