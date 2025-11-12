import { Link } from "react-router-dom";
import styled from "styled-components";
import SVGIcons from "./SVGIcons";

const Container = styled.div`
  background-color: red;
  color: blue;
`;

// NaviButton이 가지고 있어야 할 Property(매개변수) 타입들 설정
// Union
type Props = {
  name: "home" | "profile" | "community" | "explorer" | "gpt";
};

const NaviButton = ({ name }: Props) => {
  return (
    <Container>
      <Link to={name === "home" ? "" : name}>
        <div style={{ width: 30, height: 30 }}>
          <SVGIcons name={name} />
        </div>
      </Link>
    </Container>
  );
};

export default NaviButton;
