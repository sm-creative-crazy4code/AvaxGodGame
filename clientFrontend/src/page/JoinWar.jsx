import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { CustumButton,pagesHOC } from '../components'
import styles from '../styles'

const JoinWar = () => {
    const {contract,walletAddress,setShowAlert,gameData,setWarName} = useGlobalContext()
    const navigate = useNavigate()
    

    const handelClick= async(warname)=>{
      setWarName(warname)

      try {
        await contract.joinBattle(warname)
        setShowAlert({status:true,type:'success',message:`joining ${warname}`})

      } catch (error) {
        console.log(error)
        
      }

    }
  


  return (
   





 
    <>
      <h2 className={styles.joinHeadText}>
        Available Battles
      </h2>
      <div className={styles.joinContainer}>
           {gameData.pendingWar.length ? gameData.pendingWar.filter((war)=>!war.players.includes(walletAddress)).map((war,index)=>(<div className={styles.flexBetween} key={war.name+index}>
                <p className={styles.joinBattleTitle} >{index+1}.{war.name}</p>
                  <CustumButton title="Join" handelClick={()=>handelClick(war.name)} />


           </div>))  :<p className={styles.joinLoading}></p>} 
      </div>


      <p className={styles.infoText} onClick={()=>navigate('/create-war')}>Or creare a new battle</p>
    </>
  )
}

export default pagesHOC(JoinWar,
    <>Join<br/> a battle </>,
    <>JOIN already existing battle</>
    )