import {ethers} from 'ethers'
import { ABI } from '../contract'


const AddnewEvent =(eventFilter,provider,cb)=>{
    provider.removeListener(eventFilter)
     provider.on(eventFilter,(logs)=>{
        const parseLog =new ethers.utils.Interface(ABI).parseLog(logs)
        cb(parseLog)
     })
} 


export const createEventListeners =({navigate,contract,setShowAlert,provider,walletAddress,setUpdateGameData})=>{
  const NewPlayersEventFilter = contract.filters.NewPlayer();
  AddnewEvent(NewPlayersEventFilter,provider,({args})=>{
    console.log("New player created",args)
    if(walletAddress==args.owner){
        setShowAlert({
            status:true,
            type:'success',
            message:"Player has been successfully created"

        })
    }

  })

  const NewWarsEventFilter = contract.filters.NewBattle();

   AddnewEvent(NewWarsEventFilter,provider,({args})=>{
        console.log("New Battle created")
        if(walletAddress.toLowerCase() === args.player1.toLowerCase()  || walletAddress.toLowerCase() === args.player2.toLowerCase() ){
          navigate(`/war/${args.battleName}`)
        }
        setUpdateGameData( (prev)  => prev+1)



   })


}