import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Dot 크기 조절하는 애니메이션 keyframe
const scale = keyframes`
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1);
    }
`;

const Dot = styled.div`
  background-color: white;
  width: 10px;
  height: 10px;
  border-radius: 20px;
  margin: 5px;
  /* 반복되는 애니메이션 */
  animation: ${scale} 1.5s infinite ease-in-out;
  /* 각 Dot별로 애니메이션 실행 전 지연시간 적용 */
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

type Props = {
  theme: "light" | "dark";
};

const LoadingScreen = ({ theme = "dark" }: Props) => {
  return (
    <Container
      style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}
    >
      <Dot
        style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#000000" }}
      />
      <Dot
        style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#000000" }}
      />
      <Dot
        style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#000000" }}
      />
    </Container>
  );
};

export default LoadingScreen;
