import React, { useState } from 'react';
import { PageHOC,CustomInput,CustomButton } from '../components';
import { useGlobalContext } from '../context';
import { useSearchParams } from 'react-router-dom';

const Home = () => {

  const {contract ,walletAddress}= useGlobalContext()
  const [player,setPlayer] = useState("")

  const handleClick = async() => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);
      if (!playerExists) {await contract.registerPlayer(player);}
      
    } catch (error) {
      alert(error)
    }

  }
  return (
    <div className='flex flex-col'>
     <CustomInput 
       label="Name"
       placeholder="Enter your player name"
       value={player}
       handleValueChange={setPlayer}
     />

     <CustomButton
      title="Register"
      handleClick={()=>{}}
      restStyles="mt-6"
     />
    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to AVAX Gods <br/> a Web3 NFT card game</>,
  <> Connect your wallet to start playing the ultimate NFT card game</>
  );