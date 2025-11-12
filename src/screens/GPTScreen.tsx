import OpenAI from "openai";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div``;

// 메시지 프롬프터
const PromptBox = styled.div``;

const PromptTitle = styled.div``;

const PromptArea = styled.textarea``;

const SendButton = styled.button``;

// GPT 응답 결과
const ResponeBox = styled.div``;
const Result = styled.div`
  white-space: pre-wrap;
`;

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

  // TextArea에 입력한 값 가져오기
  const onChange = () => {};

  // GPT Server에 프롬프터 전달(=비동기)
  const onSendPrompt = async () => {
    try {
      // GPT 프롬프터 전달하기
      const completion = await client.chat.completions.create({
        model: "gpt-5-nano",

        // AI의 역할 부여 + User가 입력한 Prompt 전달
        messages: [
          { role: "system", content: "you are a helpful assistant" },
          { role: "user", content: "오늘의 운세 알려줘" },
        ],

        // AI 응답 메시지가 실시간으로 쪼개서 받아올 건지 여부
        stream: true,
      });

      // console.log(completion);

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
      console.error("OpenAI Completion Error: ", e);
    }
  };

  return (
    <Container>
      {/* 메시지 프롬프터 */}
      <PromptBox>
        <PromptTitle>메시지 입력 창</PromptTitle>
        <PromptArea onChange={onChange} />
        <SendButton onClick={onSendPrompt}>보내기</SendButton>
      </PromptBox>
      {/* 응답 로딩 메시지 */}
      {/* GPT 응답 결과 */}
      <ResponeBox>
        <Result>{responeResult}</Result>
      </ResponeBox>
    </Container>
  );
};

export default GPTScreen;
