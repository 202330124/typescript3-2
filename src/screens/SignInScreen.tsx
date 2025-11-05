import styled from "styled-components";
import { useState } from "react";
import { useMyAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/img/Project_Logo.png";

// 화면 안에 Style을 가진 미니 컴포넌트
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 50px;
  /* 브라우저 크기에 따라 배치 열 변경 */
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  background-color: ivory;
`;

// 왼쪽 사이드
const Logo = styled.img`
  width: 50%;
  height: auto;
  object-fit: contain;
  max-width: 300px;
`;

// 오른쪽 사이드
const SignInBox = styled.div`
  background-color: #a8ffa8;
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
`;

const FormTitle = styled.p`
  font-size: 12px;
  color: #2c2c2c;
`;

const Input = styled.input<{ active?: boolean }>`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  font-size: 15px;

  /* placeholder의 텍스트만 변경 */
  &::placeholder {
    font-size: 12px;
  }

  /* type이 submit인 input 태그의 스타일만 변경 */
  &[type="submit"] {
    cursor: pointer;
    /* 마우스 올리면(호버링) 투명도 변화 */
    &:hover {
      opacity: 0.8;
    }
  }

  /* 로딩 중인 경우에 버튼 색상 변경 */
  background-color: ${(props) => (props.active ? "blue" : "white")};
`;

// 버튼들
const Footer = styled.div``;
const Btn = styled.div``;

// Type
type InputFieldType = "email" | "password";

// 임의의 시간동안 대기하는 함수
// time: 대기시간(ms, 1000ms = 1초)
// resolve: async 함수에서 반환하는 값
/**
 *
 * @param time 대기시간(ms, 1000ms = 1초)
 * @returns resolve: async 함수에서 반환하는 값
 */
const waitForTime = async (time: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, time);
  });
};

// 로그인 화면을 구현할 컴포넌트
const SignInScreen = () => {
  // Id, Pw를 담아둘 데이터(State)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Loading 상태
  const [loading, setLoading] = useState<boolean>(false);

  // route 등록된 페이지 이동을 위한 Hook
  const navi = useNavigate();

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
      const result = await waitForTime(3000);

      // 만일 성공했으면
      if (result === "success") {
        // 로그인 성공
        signIn(email, password);

        // 로그인 성공 후에 -> 메인 화면으로 이동
        const moveToURL = "/";
        navi(moveToURL);
      } else {
        // 로그인 실패
        // 로그인 실패 후에 -> 메시지 띄우기 or 이메일, 비밀번호 입력 초기화
        alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      // B. 로그인 실패(etc.. 잘못된 ID, 잘못된 비밀번호, 인터넷 문제)
    }

    // end. 로딩 종료
    // setLoading(false);
  };

  return (
    <Container>
      {/* 왼쪽(L) 사이드 */}
      <Logo src={LogoImg} />

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
            active={loading}
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
