/**
 * 임의의 시간동안 대기하는 함수
 * @param time 대기시간(ms, 1000ms = 1초)
 * @returns resolve:async 함수에서 반환하는 값
 */
export const waitForTime = async (time: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, time);
  });
};
