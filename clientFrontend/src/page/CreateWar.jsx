import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CustumButton,CustumInput,pagesHOC,GameLoad } from '../components';
import styles from '../styles';
import { useGlobalContext } from '../context';




const CreateWar = () => {
  const navigate = useNavigate()
  const{contract,warName,setWarName,gameData}= useGlobalContext()
  const[waitBattle,setWaitBattle]=useState(false)



useEffect(()=>{
if(gameData?.activeWar?.battleStatus === 0){
  setWaitBattle(true)
}


},[gameData])


  
  const handelClick=async()=>{
  if(!warName || !warName.trim()) return null;
    try {

      await contract.createBattle(battleName)
      setWaitBattle(true)
      
    } catch (error) {
      console.log(error)
      
    }
   

  }

  

  return (
    <>
  {waitBattle && <GameLoad/>  }
    
    
    <div className='fle flex-col mb-5' >
      <CustumInput
       label="WAR"
       placeholder="Enter the Warzone"
       value={warName}
       handelValueChange={setWarName}
      />
      <CustumButton
       title='Create War'
       handelClick={handelClick}
       restStyles="mt-6 "
      />
      
    </div>

    <p className={styles.info} onClick={()=>navigate("./join-war")} >Or Join already existing Wars</p>

    </>
  )
}

export default  pagesHOC(CreateWar ,
    <>Create <br/>  A new war zone</>,
    <>Create your own warzone and waits for others to join</>
    
    )