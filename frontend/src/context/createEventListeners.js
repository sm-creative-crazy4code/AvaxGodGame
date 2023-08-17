import { ethers } from "ethers";
import { ABI } from "../contract";



const AddNewEvent=(eventfilter,provider,cb)=>{
 provider.removeListener(eventfilter);

 provider.on(eventfilter,(logs)=>{
    const parsedLog = (new ethers.utils.Interface(ABI)).parsedLogs(logs);
    cb(parsedLog)
 })


}


export const createEventListener=({
    navigate,
    contract,
    provider,
    walletAddress,
    setShowAlert,
    setUpdateGameData,

   })=>{
   const NewPlayerEventFilter=contract.filters.NewPlayer();
   AddNewEvent(NewPlayerEventFilter,provider,({args})=>{
    console.log("New Player created",args);

    if(walletAddress === args.owner){
        setShowAlert({
            status:true,
            type:"success",
            message:"Player has been successfully added"
        })
    }
   })


//Event listener for a new event 

   const NewBattleEventFilter=contract.filters.NewBattle();
   AddNewEvent(NewBattleEventFilter,provider,({args})=>{
    console.log("new battle event started",args,walletAddress);
    if(walletAddress.toLowerCase()===args.player1.toLowerCase()|| walletAddress.toLowerCase()===args.player2.toLowerCase()){
        navigate(`/battle/${args.battleName}`);
    }
    
    setUpdateGameData((prevUpdateGameData)=>prevUpdateGameData+1)
        


   })

}