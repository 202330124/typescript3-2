import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NaviButton from "../components/NaviButton";
import { useMyAuth } from "../contexts/AuthContext";
import { on } from "events";

// MainRoute 페이지에 공통으로 적용될 화면 구성

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  width: 100%;
`;

const MenuBox = styled.div`
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: gray;
  cursor: pointer;
`;

const Footer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
`;

const Page = styled.div`
  // background-color: blue;
`;

const Layout = () => {
  // 로그인 정보 Reset을 위한 유저 정보가 저장된 Context
  const { signOut } = useMyAuth();

  // router에 등록된 페이지 이동을 위한 Navi Hook
  const navi = useNavigate();

  // 로그아웃 함수
  const onSignOut = () => {
    // 0. 정말 로그아웃 할건지 확인
    const message = "정말 로그아웃 하시겠습니까?";
    const ok = window.confirm(message);

    // A. 로그아웃하는 경우에만 실행
    if (ok) {
      // A-1. 로그인 정보 Reset
      signOut();

      // A-2. 로그인 페이지로 이동
      const moveToURL = "/signin";
      navi(moveToURL);
    }
  };

  return (
    <Container>
      {/* 모든 페이지에서 공통으로 보여지는 부분 */}
      <MenuBox>
        <NaviButton name="home" />
        <NaviButton name="explorer" />
        <NaviButton name="community" />
        <NaviButton name="profile" />
        <NaviButton name="gpt" />
        <Footer>
          <Menu
            onClick={() => {
              onSignOut();
            }}
          >
            Logout
          </Menu>
          <Menu>Setting</Menu>
        </Footer>
      </MenuBox>

      {/* 개별 페이지가 보여지는 부분 */}
      <Page>
        {/* 하위 페이지를 Rendering할 위치 */}
        <Outlet />
      </Page>
      {/* <TestButton></TestButton> */}
    </Container>
  );
};

export default Layout;
