import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {GlobalContextProvider} from './context'
import {Home,CreateWar,JoinWar,War} from './page';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalContextProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-war" element={<CreateWar />} />
      <Route path="/join-war" element={<JoinWar/>} />
      <Route path="/war/:Warname" element={<War/>} />
    </Routes>
    </GlobalContextProvider>
  </BrowserRouter>,
);
