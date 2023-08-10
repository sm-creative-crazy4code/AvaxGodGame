import React, { useState } from 'react';
import { PageHOC,CustomInput,CustomButton } from '../components';
import { useGlobalContext } from '../context';
import { useSearchParams } from 'react-router-dom';

const Home = () => {

  const {contract ,walletAddress,setShowAlert}= useGlobalContext()
  const [player,setPlayer] = useState("")
  

  const handleClick = async() => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);
           if (!playerExists) {await contract.registerPlayer(player,player,{ gasLimit: 500000 });
      setShowAlert({
        status:true,
        type:"info",
        message:`${player}  is being summoned`
      })
      
      }
      
    } catch (error) {
      setShowAlert({
        status:true,
        type:"failure",
        message:"Oops! Something went wrong"
      })
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
      handleClick={handleClick}
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