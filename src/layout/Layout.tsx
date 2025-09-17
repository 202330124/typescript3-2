import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import NaviButton from "../components/NaviButton";

// MainRoute 페이지에 공통으로 적용될 화면 구성

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  width: 100%;
`;

const MenuBox = styled.div`
  background-color: ivory;
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
  return (
    <Container>
      {/* 모든 페이지에서 공통으로 보여지는 부분 */}
      <MenuBox>
        <NaviButton name="home" />
        <NaviButton name="explorer" />
        <NaviButton name="community" />
        <NaviButton name="profile" />
        <Footer>
          <Menu>Logout</Menu>
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
