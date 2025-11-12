import { useState } from "react";
import styled from "styled-components";
import { useMyAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LOGO_IMG from "../assets/img/Project_Logo.png";
import { waitForTime } from "../util";
// 화면 안에 Style을 가진 미니 컴포넌트
const Container = styled.div`
  background-color: #0a0a0a;
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
`;
// 왼쪽 사이드
const Logo = styled.img`
  width: 100%;
  max-width: 300px;
  min-width: 200px;
  height: auto;
  object-fit: contain;
`;
// 오른쪽 사이드
const SigninBox = styled.div`
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
const FormTitle = styled.div`
  font-size: 11px;
  color: #d1d1d1;
`;
const Input = styled.input<{ active?: boolean }>`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  font-size: 15px;
  background-color: #eeeeee;
  /* placeholder의 텍스트만 변경 */
  &::placeholder {
    font-size: 12px;
    color: #3b3b3b;
  }
  /* type이 submit인 input 태그의 스타일만 변경 */
  &[type="submit"] {
    cursor: pointer;
    /* 마우스 올리면(호버링) 투명도 변화 */
    &:hover {
      opacity: 0.8;
    }
    /* 로딩 중인 경우에 버튼 색상 변경 */
    background-color: ${(props) => (props.active ? "blue" : "white")};
  }
`;
// 버튼들
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
`;

// 구성 요소들 간의 구분을 짓기 위한 CSS 스타일 선(Line)
const DivisionLine = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  color: #8e8e8e;
  font-size: 14px;
  /* P태그 작성된 텍스트의 전후에 적용할 Style &::before,after로 적용 */
  &::before,
  &::after {
    content: "--------------";
    flex: 1;
    /* border-bottom: 1px solid #000; */
    margin: 0 10px;
  }
`;

// Union Type
type InputFieldType = "email" | "password";

// 로그인 화면을 구현할 컴포넌트
const SignUpScreen = () => {
  // Id , Pw 를 담아둘 데이터 (State)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Loading 상태
  const [loading, setLoading] = useState<boolean>(false);
  // route 등록된 페이지 이동을 위한 Hook
  const navi = useNavigate();

  // 로그인 유저 상태를 useMyAuth 훅에서 가져온다.
  const { currentUser, signIn } = useMyAuth();

  // Input이 변경될 때 호출되는 함수 => 입력한 Text를 가져오는
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 1.Input 컴포넌트에 입력한 텍스트
    const inputText = event.target.value;
    // 1-A. Input 컴포넌트 입력 공간에 따라 텍스트 분류
    const inputName = event.target.name as InputFieldType;

    // 2. 입력한 텍스트를 State 에 할당
    switch (inputName) {
      // 2-1. ID를 입력한 경우에는 email에만 할당
      case "email":
        setEmail(inputText);
        break;
      // 2-2. PW를 입력한 경우에는 PW 에만 할당
      case "password":
        setPassword(inputText);
        break;
    }
  };

  // [로그인]입력한 정보를 Server에 제출
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 0. 제출 시에, 화면 '새로고침'하지 않고 그대로 둠.
    event.preventDefault();

    // 1.점검 (아무 값도 안씀, 최소 텍스트, 비속어, 특수문자... )
    if (loading) {
      return false;
    }
    if (email === "" || password === "") {
      alert("최소 1자리 이상 쓰셔야합니다.");
      return;
    }

    // 2.로딩 시작
    setLoading(true);
    try {
      // A. 로그인 처리 with Server .. API
      // Input Code : call your `Server API`
      // async/await : 비동기 처리
      // await signinServer(email,password);

      // [@TEST@] 3초 이후에 로그인 여부 알려준다.*
      const result = await waitForTime(3000);
      // 만일 성공했으면
      if (result === "success") {
        // 로그인 성공!
        signIn(email, password);
        // 로그인 성공 후에 -> 메인 화면으로 이동
        const moveToURL = "/";
        navi(moveToURL);
      } else {
        // 로그인 실패!
        // 로그인 실패 후에 -> 메시지 띄우기 or email&PW 입력 초기화
        alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      // B. Error로 인한 로그인 실패 (etc.. 잘못된ID,잘못된PW,인터넷...)
    }
    // end. 로딩 종료
    // setLoading(false);
  };

  return (
    <Container>
      {/* 왼쪽(L) 사이드 */}
      <Logo src={LOGO_IMG} />
      {/* 오른쪽(R)사이드 */}
      <SigninBox>
        {/* Id, PW 입력 제출 */}
        <Form onSubmit={onSubmit}>
          <FormTitle>아이디 / 이메일</FormTitle>
          <Input
            name="email"
            type="email"
            placeholder="아이디를 입력하세요"
            onChange={(e) => onChange(e)}
          />
          <FormTitle>비밀번호</FormTitle>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
          />
          {/*로그인 버튼 역할의 Input*/}
          <Input
            active={loading}
            type="submit"
            value={loading ? "로그인 중..." : "회원가입하기 하기"}
          />
        </Form>
      </SigninBox>
    </Container>
  );
};
// 회원가입、 기타 로그인 버튼 컴포넌트
const Btn = styled.div<{ bgColor?: string; fontColor?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  color: ${({ fontColor }) => fontColor || "#000"};
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
`;
const BtnLogo = styled.img`
  width: 20px;
  height: auto;
  flex: 0.4;
`;
const BtnTitle = styled.div`
  flex: 5;
  text-align: center;
`;
function MenuButton({
  title,
  bgColor,
  fontColor,
  imgSrc,
  onClick,
}: {
  title: string;
  bgColor?: string;
  fontColor?: string;
  imgSrc?: string;
  onClick?: () => void;
}) {
  return (
    <Btn onClick={onClick} bgColor={bgColor} fontColor={fontColor}>
      {imgSrc && <BtnLogo src={imgSrc} />}
      <BtnTitle>{title}</BtnTitle>
    </Btn>
  );
}

// 외부에서 SignInScreen 컴포넌트 기본으로 호출하도록
export default SignUpScreen;
