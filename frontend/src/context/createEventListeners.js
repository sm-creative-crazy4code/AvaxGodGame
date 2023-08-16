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


}