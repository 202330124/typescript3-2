import styled from "styled-components";

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

// 로그인 화면을 구현할 컴포넌트
const SignInScreen = () => {
  return (
    <Container>
      {/* 왼쪽(L) 사이드 */}
      <Logo style={{ width: 100, height: 100, backgroundColor: "green" }} />

      {/* 오른쪽(R) 사이드 */}
      <SignInBox>
        {/* Id, PW 입력 제출 */}
        <Form>
          <FormTitle>아이디 / 이메일</FormTitle>
          <Input type="email" placeholder="아이디를 입력하세요: " />
          <FormTitle>비밀번호</FormTitle>
          <Input type="password" placeholder="비밀번호를 입력하세요: " />
          {/* 로그인 버튼 역할의 Input */}
          <Input type="submit" value={"로그인"} />
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
