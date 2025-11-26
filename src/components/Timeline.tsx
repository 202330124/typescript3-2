// Home 화면에서 FakerData 혹은 서버에서 가져올 Data들을 시간순으로 나열
import { useEffect, useState } from "react";
import styled from "styled-components";
import { waitForTime } from "../util";
import { fakeDatas, FakeDataType } from "../data/fakeData";
import LoadingScreen from "../screens/LoadingScreen";
import Post from "./Post";
import { motion } from "framer-motion";

const Container = styled.div``;

const MotionView = styled(motion.div);

const Timeline = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<FakeDataType[]>();

  // 데이터 받아오기 함수
  const fetchDataFromServerAPI = async () => {
    // @test@ 지연함수 3초간
    await waitForTime(3000); // ---> 나중에 Server API 함수로 대체

    // 불러온 데이터 return
    return fakeDatas;
  };

  // Model: 데이터 fetch... 서버로부터 가져온다, 읽어온다
  const getData = async () => {
    // 1. 로딩 시작...
    setLoading(true);

    // 데이터 읽어온다. from Server/Local...
    const data = await fetchDataFromServerAPI();

    // 읽어온 데이터는 State에 할당해서 사용할 수 있도록 준비
    setData(data);

    // 2. 로딩 종료...
    setLoading(false);
  };

  // param1: TimeLine 컴포넌트 생성 시, 한 번 실행
  // param2: 한 번 실행 default + 추가실행(조건이 변경될 때마다)
  useEffect(() => {
    getData();
  }, []);

  // View: 화면 Rendering
  return (
    <Container>
      {loading ? (
        <LoadingScreen theme="light" />
      ) : (
        <div>
          {data?.map((info, index) => (
            <motion.div
              // 애니메이션 시작 시점의 상태값(초기값)
              initial={{ opacity: 0, y: 40 }}
              // 애니메이션 종료 시점의 상태값(종료값)
              animate={{ opacity: 1, y: 0 }}
              // 전환 옵션(etc. 전환 시간, 지연 시간)
              transition={{ duration: 0.5, delay: 0.3 * index }}
            >
              <Post {...info} index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Timeline;
