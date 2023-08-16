import React from 'react';
import { CustomButton,CustomInput,PageHOC,Gameload } from '../components';
import { useNavigate } from 'react-router-dom';  
import styles from '../styles';
import { useGlobalContext } from '../context';


const CreateBattle = () => {
   const {contract,battleName,setBattleName} = useGlobalContext()
   const[waitBattle,setWaitBattle,gameData] = useState(false);
   const navigate = useNavigate()
   
   useEffect(() => {
          if (gameData?.activeBattle?.battleStatus===0){
                     setWaitBattle(true)
          }



   },[gameData]);
   
   
   const handleClick =async ()=>{
      if(!battleName || !battleName.trim()) return null;

      try {
        await contract.createBattle(battleName )
        setWaitBattle(true);
      } catch (error) {
        console.log(error);
        
      }


   }



  return (
  <>
  {waitBattle && <Gameload/>} 
    <div className='flex flex-col mb-5'>
        <CustomInput
          label="Battle"
          placeholder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}

        />
        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        
        />
    </div>
  <p className={styles.infoText} onClick={()=>navigate("/join-battle")}>
    Or join already existing battle
  </p>
  </>
  )
};

export default PageHOC(
  CreateBattle,
  <>Create <br/> a new Battle</>,
  <>Create your owm Battle and wait for other plalyers to join</>
  );