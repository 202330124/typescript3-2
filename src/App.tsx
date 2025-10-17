import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./routes/MainRoute";
import styled from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

// 최상위 노드, 루트 노드

function App() {
  return (
    <AuthProvider>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </AuthProvider>
  );
}

export default App;
