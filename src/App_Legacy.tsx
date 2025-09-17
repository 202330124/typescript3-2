import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // 페이지 분배를 위한 Playground, 축구장 생성
    <BrowserRouter>
      {/* 페이지 그룹 */}
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/settings'} element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;