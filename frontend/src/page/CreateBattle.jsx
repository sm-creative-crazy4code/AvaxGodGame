import React from 'react';
import { PageHOC } from '../components';

const createBattle = () => {
  return (
    <div>
      {/* <h1 className="text-5xl p-3">Avax Gods</h1>
      <h2 className="text-3xl p-3">Web3 NFT Battle-style Card Game</h2>
      <p className="text-xl p-3">Made with 💜 by @SM</p> */}
    </div>
  )
};

export default PageHOC(
  createBattle,
  <>Create <br/> a new Battle</>,
  <>Create your owm Battle and wait for other plalyers to join</>
  );