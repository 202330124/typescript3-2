import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Settings from './components/Settings';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { router } from './routes/MainRoute';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

// 최상위 노드, 루트 노드

function App() {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;