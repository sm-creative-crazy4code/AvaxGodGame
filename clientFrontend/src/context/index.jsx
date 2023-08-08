import React ,{createContext, useContext, useEffect, useRef, useState} from 'react';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {useNavigate} from 'react-router-dom';
import {ABI,ADDRESS} from '../contract'
import { createEventListeners } from './EventListeners';


   
const GlobalContext = createContext();

export const GlobalContextProvider =({children})=>{
const [walletAddress,setWalletAddress]= useState("");
const [provider,setProvider] = useState("");
const [contract,setContract] = useState("");
const [showAlert,setShowAlert]=useState({
  status:false,type:"info",msg:''
})

const [warName,setWarName] = useState("")
const [gameData,setGameData]= useState({pendingWar:[],
  players:[],wars:[],activeWar:null
})

const[updateGameData,setUpdateGameData] = useState(0)

const[battleGround,setBattleGround]=useState('bg-astral')


const navigate = useNavigate()







// set the wallet address
const updateWalletAddress = async()=>{
 const accounts = await window.ethereum.request({
    method:'eth_requestAccounts'})

if(accounts) setWalletAddress(accounts[0])

}


//updates on chaging account within core
useEffect(()=>{
    updateWalletAddress();
    window.ethereum.on('accountChanged',updateWalletAddress)
},[])

// sets the smart contract address
useEffect(()=>{
    const setSmartContractProvider = async () =>{
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(connection);
      const signer = web3Provider.getSigner();
      const newContract = new ethers.Contract(ADDRESS,ABI,signer)


      setProvider(web3Provider)
      setContract(newContract)

    }

    setSmartContractProvider()
    
},[])


// saving the state of the game
useEffect(()=>{

const fetchGameData = async()=>{
 const fetchWars = await contract.getAllBattles();
 const pendingWars = fetchWars.map((war)=>war.status===0)
  
let activeWar

fetchWars.forEach((war) => {
  if(war.players.find((player)=>player.toLowerCase()===walletAddress.toLowerCase())){
    if(war.winner.startsWith('0x00')){
      activeWar=war
    }
  }


  
});

setGameData({pendingWars:pendingWars.slice(1),activeWar})

}

if(contract) fetchGameData()

},[contract,updateGameData])

















// for eventListenrs
useEffect(()=>{
if(contract){
  createEventListeners({
    navigate,contract,setShowAlert,provider,walletAddress,setUpdateGameData
     
  })

}


},[contract])


//for the custom alert component
useEffect(()=>{    
  if(showAlert.status){
 const timer =setTimeout(()=>{
  setShowAlert({status:false,type:'info',msg:""})
 },[5000])
 
return()=>clearTimeout(timer)

  }


},[showAlert])




 

return(
  <GlobalContext.Provider value={{
    contract,walletAddress,showAlert,setShowAlert,warName,setWarName,gameData,battleGround,setBattleGround
  }}>
  {children}
  </GlobalContext.Provider>
)}
export const useGlobalContext =()=>useContext(GlobalContext)


