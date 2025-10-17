// Main 페이지들을 위한 구성하기 위한 Route를 생성
// 만드는 이유? 관리하기 쉽도록 하기 위해서

import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Layout from "../layout/Layout";
import Community from "../screens/Community";
import Explorer from "../screens/Explorer";
import Profile from "../screens/Profile";
import SignInScreen from "../screens/SignScreen";
import ProtectedRoute from "./ProtectedRoute";

// Main 페이지들이 구성된 분배기(Router)
// export: 외부에서 사용 가능 허가
export const router = createBrowserRouter([
  // 로그인 O => 로그인 후 보여줄 MainPage
  // !!주의 로그인 안한 상태에서 해당 도메인 접근 불가
  {
    path: "/",

    // 상위 element는 하위 페이지에 적용될 공통 element
    // <>, </>: fragment
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    // 하위 페이지 구성 ex) <Routes />
    children: [
      // React에서 {}는 Object, 객체를 의미
      { path: "", element: <Home /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
      { path: "explorer", element: <Explorer /> },
      { path: "community", element: <Community /> },
    ],
  },

  // 로그인 X => 보여줄 페이지(로그인, 회원가입, 비밀번호 찾기 페이지 등...)
  {
    path: "/signin",
    element: <SignInScreen />,
  },
]);
