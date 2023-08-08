import React, {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import styles from '../styles'
import {Alert} from '../components'
import { useGlobalContext } from '../context'
import { attack,attackSound, defense, defenseSound,player01 as player01Icon,player02 as player02Tcon } from '../assets'
import {playAudio} from '../utils/animation'

const War = () => {
 const{contract,walletAddress,showAlert,setShowAlert,warName,setWarName,gameData,battleGround, } =useGlobalContext
 const[player01,setPlayer01]=useState({})
 const[player02,setPlayer02]=useState({})

 const Warname = useParams()
 const navigate = useNavigate()
 

useEffect(()=>{

const getPlayerinfo= async()=>{

    try {
        
  let player1address=null
  let player2address=null

  if(gameData.activeBattle.players[0].toLowerCase()===walletAddress.toLowerCase()){
    player1address=gameData.activeBattle.players[0]
    player2address=gameData.activeBattle.players[1]
     }else{
        player1address=gameData.activeBattle.players[1]
        player2address=gameData.activeBattle.players[0]


     }

    const p1Token = await contract.getPlayerToken(player1address)
    const player01= await contract.getPlayer(player1address)
 

    const p2Token = await contract.getPlayerToken(player2address)
    const player02= await contract.getPlayer(player2address)


    const p1Att = p1Token.attackStrength.toNumber()
    const p2Att = p2Token.attackStrength.toNumber()

    } catch (error) {
        
    }

}


if(contract && gameData.activeBattle) getPlayerinfo();

},[contract,gameData,Warname])



  return (
    <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}>
      <h1 className='text-xl text-white'>{Warname}</h1>
    </div>
  )
}

export default War
