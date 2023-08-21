import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {OnboardModal} from './components'
import { GlobalContextProvider } from './context';
import {Home,CreateBattle,JoinBattle,Battle,Battleground} from './page';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalContextProvider>
    <OnboardModal/>
    <Routes>
      {/* /battleground */}
      <Route path="/" element={<Home />} />
      <Route path="/create-Battle" element={<CreateBattle />} />
      <Route path="/join-battle" element={<JoinBattle />} />
      <Route path="/battle/:battleName" element={<Battle />} />
      <Route path="/battleground" element={<Battleground />} />
    </Routes>
    </GlobalContextProvider>
  </BrowserRouter>,
);
