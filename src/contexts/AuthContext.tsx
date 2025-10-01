import { createContext, useContext } from "react";

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
  // 2-2. Context를 통해 넘겨줄 Property에게 실제 데이터를 할당 / 불러오기 / 계산

  // 2-3. return을 통해서 생성한 데이터를 넘겨줄 수 있는 컴포넌트 반환
  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};

// 3. Provider를 통해 제공되는 user 데이터, 정보를 불러오기 / 사용하기
// + 생성한 Context 정보를 반환
export const getAuth = (): AuthType => useContext(AuthContext);
