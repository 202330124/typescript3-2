import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1`
    color: blue;
    font-size: 120px;
`;
const Desc = styled.p`
    color: green;
    font-size: 50px;
`;

const Home = () => {
    return <Container>
        <Title>Home</Title>
        <Desc>This is Home page</Desc>
    </Container>
}

export default Home;

// 화살표 함수는 임시, 변수 선언 필요

/*
var ;;
const ;; 재할당이 불가능한 변수
let ;; 재할당이 가능한 변수
*/