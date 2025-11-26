import { faker } from "@faker-js/faker";

// 랜덤으로 20개 서로 다른 Dataset 만들어짐
faker.seed(20);

// API로 주고 받을 Data 형식 / 형태 / 모습을 구현
export type FakeDataType = {
  key: string;
  title: string;
  description: string;
  author: {
    name: string;
    profile: string;
  };
  image: string;
};

// FakerData
export const fakeDatas: FakeDataType[] = [...Array(20)].map(() => {
  // Json 구조체 형태로 20개 데이터
  return {
    key: faker.string.uuid(),
    title: faker.music.songName(),
    description: faker.lorem.sentences({
      min: 3,
      max: 6,
    }),
    image: faker.image.urlPicsumPhotos({
      width: 400,
      height: 400 * 1.6,
    }),
    author: {
      name: faker.person.fullName(),
      profile: faker.image.avatar(),
    },
  };
});
