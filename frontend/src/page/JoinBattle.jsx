
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton,PageHOC } from '../components'
import styles from '../styles'



const JoinBattle = () => {
    const {contract,gameData,setShowAlert,setBattleName,walletAddress}=useGlobalContext()
    const navigate = useNavigate()
    const handleClick = async (battleName)=>{

      setBattleName(battleName)

      try {
        await contract.joinBattle(battleName)
      } catch (error) {
        
      }

    }
  return (
    <>
    <h2 className={styles.joinHeadText}>
       Available Battle 
    </h2>

    <div className={styles.joinContainer}>
      {gameData.pendingBattles.length?gameData.pendingBattles.filter((battle)=>!battle.player.includes(walletAddress)).map((battle,index)=>(
        <div key={battle.name+index} className={styles.flexBetween}>
     <p className={styles.joinBattleTitle}>
      {index+1}. {battle.name}


     </p>
     <CustomButton 
      title="Join"
      handleClick={()=>handleClick(battle.name)}
     />

        </div>
      )) :<p className={styles.joinLoading}>
        Reload the page to join new Battle
      </p>

      }

    </div>
    <p className={styles.infoText} onClick={()=>navigate("/create-Battle")}>
        Or create a new battle

    </p>
    
    </>
  )
}

export default PageHOC(
    JoinBattle,
    <>Join<br/> a Battle</>,
    <>Join already existing Battle</>

)

