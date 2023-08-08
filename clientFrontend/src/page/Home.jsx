import React, { useEffect, useState } from 'react';
import { pagesHOC, CustumInput, CustumButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext()
  const [playerName, setPlayerName] = useState()

  // for redirecting the player to new page
  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress)
      if (playerExists && playerTokenExists) {
        navigate('/create-war')}
      }

      if(contract) checkForPlayerToken()
    }, [contract])





  const handelClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);
      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 })
        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned`
        })
      
        setTimeout(() => navigate('/create-battle'), 8000);


      }

    } catch (error) {
      setShowAlert({
        status: true,
        type: "failure",
        message: "Something went wrong"
      })
      console.log(error)
    }
  }







  return (
    <div className='flex flex-col '>
      <CustumInput label="Name" placeholder="Enter your player name" value={playerName} handelValueChange={setPlayerName} />
      <CustumButton title="Register" handelClick={handelClick} restStyles="mt-6" />
    </div>
  )
};

export default pagesHOC(Home,
  <>Welcome to AvaxGods <br />  A web3 nft card game</>,
  <>Connect your wallet to start playing</>

);