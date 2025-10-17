import { createContext, useContext, useEffect, useState } from "react";

// Type: User Property
type MyUser = {
  uid: string;
  email: string;
  displayName: string;
};

// Type: Auth 인증 관련 Property
type AuthType = {
  currentUser: MyUser | null;
  signIn: () => void;
  signOut: () => void;
};

// 1. Context 생성
const AuthContext = createContext<AuthType>({
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
});

// 2. Provider 생성
// 2-1. 함수형 컴포넌트 선언
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 현재 유저의 로그인 상태 정보
  const [currentUser, setCurrentUser] = useState<MyUser | null>(null);

  // 2-2. Context를 통해 넘겨줄 Property에게 실제 데이터를 할당 / 불러오기 / 계산
  // 2-2a. 로그인 함수 만들기
  const signIn = (/*id: string, password: string*/) => {
    // Input Code ...
    // Server랑 통신해서 로그인 여부 진행(id, pw)
    try {
      // A. 서버 통신, 로그인 성공!

      return true;
    } catch (e) {
      // B. 서버 통신, 로그인 실패!
      console.warn(e);
      return false;
    }
  };

  // 2-2b. 로그아웃 함수 만들기
  const signOut = () => {
    // Input Code ...
    // Server랑 통신해서 로그인 여부 진행(id, pw)
    try {
      // A. 서버 통신, 로그아웃 성공!
      return true;
    } catch (e) {
      // B. 서버 통신, 로그아웃 실패!
      console.warn(e);
      return false;
    }
  };

  // 2-3c. currentUser 현재 유저의 로그인 여부 확인
  useEffect(() => {
    // 1. 나의 UserToken
    try {
      // 2. UserToken 정보를 Server에 보낸다.
      // 3. Token의 유효성 검사 결과
      // 3-1. 유효: 검증완료 => 로그인이 되어있음
      setCurrentUser({
        displayName: "It's Me",
        email: "test@test.com",
        uid: "dummy-dummy",
      });
    } catch (e) {
      // 3-2. 실패 => 로그인이 안되어있음
      setCurrentUser(null);
    }
  }, []);

  // 2-3. return을 통해서 생성한 데이터를 넘겨줄 수 있는 컴포넌트 반환
  return (
    <AuthContext.Provider value={{ currentUser, signIn: signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Provider를 통해 제공되는 user 데이터, 정보를 불러오기 / 사용하기
// + 생성한 Context 정보를 반환(=useContext)
export const useMyAuth = (): AuthType => useContext(AuthContext);
