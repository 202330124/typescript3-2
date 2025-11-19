import OpenAI from "openai";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

const Container = styled.div``;

// 메시지 프롬프터
const PromptBox = styled.div``;

const PromptTitle = styled.div``;

const PromptArea = styled(TextAreaAutoSize)``;

const SendButton = styled.button``;

// GPT 응답 결과
const ResponeBox = styled.div``;
const Result = styled.div`
  white-space: pre-wrap;
`;

// GPT 응답 로딩 메시지를 위한 로딩 메시지 컴포넌트
const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  
  10% {
    opacity: 1;
    transform: translateY(0px);
  }

  90% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(-6px);
  }
`;

const LoadingBox = styled.div``;

const LoadingText = styled.p`
  animation: ${fadeInOut} 2s ease-in-out infinite;
`;

const messages = [
  "질문을 이해하는 중",
  "관련 정보를 찾는 중",
  "답변 구성하는 중",
  "생각을 정리하는 중",
];

const LoadingMessage = ({ loading }: { loading: boolean }) => {
  // 로딩 메시지를 띄우기 위한 State
  const [text, setText] = useState("");

  // 최초 1번 + loading 값이 변경될 때마다 실행행
  useEffect(() => {
    // 최초 index: +1 씩 더해서 1, 2, 3, ... 10, 11 ...
    let index = 0;
    setText(messages[index]);
    // 2초 간격으로 메시지를 순환(*함수 호출되면 계속 살아있음)
    const timer = setInterval(() => {
      // 로딩 메시지를 변경(순환하도록 나머지(%)연산 사용)
      index = (index + 1) % messages.length;

      setText(messages[index]);
    }, 2000);

    // 함수가 파괴될 때 실행되는 공간(생략 가능)
    // *여러 구독함수들을 클리어(Reset)
    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return (
    <LoadingBox>{loading && <LoadingText>{text}</LoadingText>}</LoadingBox>
  );
};

// OpenAI API key 통해서 client 연결
const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const GPTScreen = () => {
  // 로딩 state
  const [loading, setLoading] = useState<boolean>(false);

  // 입력한 Text
  const [inputText, setInputText] = useState<string>("");

  // Result - GPT 결과 응답
  const [responeResult, setResponeResult] = useState<string>("");

  // TextArea에 입력한 값 가져오기 (=사용자가 텍스트를 입력할 때마다 호출)
  const onChange = (text: string) => {
    // inputText State에 할당
    setInputText(text);
  };

  // GPT Server에 프롬프터 전달(=비동기)
  const onSendPrompt = async () => {
    // 방어코드: 이미 전달해서 로딩 중인 경우에는 종료까지 전송 안됨
    if (loading || inputText.trim() === "") {
      return;
    }

    // 보내기 버튼 누르면, input area는 초기화
    setInputText("");

    // GPT의 응답 메시지도 Reset
    setResponeResult("");

    // 로딩 시작!
    setLoading(true);

    try {
      // GPT 프롬프터 전달하기
      const completion = await client.chat.completions.create({
        model: "gpt-5-nano",

        // AI의 역할 부여 + User가 입력한 Prompt 전달
        messages: [
          { role: "system", content: "you are a helpful assistant" },
          { role: "user", content: inputText },
        ],

        // AI 응답 메시지가 실시간으로 쪼개서 받아올 건지 여부
        stream: true,
      });

      // console.log(completion);

      // 무사히 응답 받았다면, 로딩 종료!
      setLoading(false);

      // completion 안에 있는 쪼개져 들어가 있는 GPT 응답 메시지(=Chunk) 별로 화면에 실시간으로 표시
      for await (const stream of completion) {
        // chunk 메시지가 있는 경우에만
        if (stream.choices[0].delta?.content) {
          // chunk로 쪼개져 생성된 새로운 메시지
          const newMessage = stream.choices[0].delta?.content;

          // 화면에 이전 메시지에 더해서 새로운 메시지 표시
          setResponeResult((oldMessage) => oldMessage + newMessage);
        }
      }
    } catch (e) {
      // 모종의 이유로 에러 발생(etc. 네트워크, API 문제 등)
      console.error("OpenAI Completion Error: ", e);
      setResponeResult(`Error가 발생했습니다. Error: ${e}`);
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* 메시지 프롬프터 */}
      <PromptBox>
        <PromptTitle>메시지 입력 창</PromptTitle>
        <PromptArea
          minRows={3}
          maxRows={10}
          autoFocus={true}
          placeholder="질문을 입력해주세요..."
          onChange={(e) => onChange(e.target.value)}
          value={inputText}
          onKeyDown={(e) => {
            // textarea => default 줄바꿈키: Enter

            // A. Shift + Enter(줄바꿈)
            if (e.key === "Enter" && e.shiftKey) {
              // 줄바꿈
              return;
            }

            // B. Enter(보내기 버튼)
            else if (e.key === "Enter") {
              // 입력창 정보들을 보내기 이전과 동일하게
              e.preventDefault();

              // ChatGPT에게 질문 보내기
              onSendPrompt();
            }
          }}
        />
        <SendButton onClick={onSendPrompt}>보내기</SendButton>
      </PromptBox>
      {/* 응답 로딩 메시지 */}
      <LoadingMessage loading={loading} />
      {/* GPT 응답 결과 */}
      <ResponeBox>
        <Result>{responeResult}</Result>
      </ResponeBox>
    </Container>
  );
};

export default GPTScreen;
