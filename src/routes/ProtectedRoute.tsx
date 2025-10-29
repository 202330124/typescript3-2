import { Navigate } from "react-router-dom";
import { useMyAuth } from "../contexts/AuthContext";

// 역할: 로그인 안한 상태에서 로그인 후 접근할 수 있는 페이지에 접근하려고 할 때, 로그인 페이지로 User를 돌려보냄

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // currentUser의 정보를 AuthContext를 통해 가져옴
  // const { currentUser } = useMyAuth();

  // [@Test]를 위해서 로그인 시켜놓음
  const currentUser = null;

  if (currentUser) {
    // A. 로그인 된 상태
    return <>{children}</>;
  } else {
    // B. 로그인 되지 않은 상태
    // => 등록되어있는 로그인 페이지로 자동 우회
    return <Navigate to={"/signin"} />;
  }
};

export default ProtectedRoute;
