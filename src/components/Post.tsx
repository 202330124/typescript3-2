import styled from "styled-components";
import { FakeDataType } from "../data/fakeData";

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  /* display: flex인 상태에서 column을 통해 세로 배치 */
  flex-direction: column;
  /* gap은 display: flex인 상태에서만 가능 */
  gap: 8px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Description = styled.div`
  font-size: 13px;
  color: #333333;
`;

const Name = styled.div`
  color: grey;
  font-weight: 600;
  font-size: 13px;
`;

const Profile = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50px;
`;

const BackgroundImg = styled.img``;

type Props = FakeDataType & {
  index: number;
};

const Post = ({ author, description, image, key, title, index }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Author>
        <Profile src={image} />
        <Name>{author.name}</Name>
      </Author>
    </Container>
  );
};

export default Post;
