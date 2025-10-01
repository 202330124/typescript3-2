import { Link } from "react-router-dom";
import styled from "styled-components";
import SVGIcons from "./SVGIcons";

const Container = styled.div`
  background-color: red;
  color: blue;
`;

// NaviButton이 가지고 있어야 할 Property(매개변수) 타입들 설정
type Props = {
  name: "home" | "profile" | "community" | "explorer";
};

const NaviButton = ({ name }: Props) => {
  return (
    <Container>
      <Link to={name === "home" ? "" : name}>
        <SVGIcons name={name} />
        {name}
      </Link>
    </Container>
  );
};

export default NaviButton;
