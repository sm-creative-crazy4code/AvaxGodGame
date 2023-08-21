import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Alert, Card, PlayerInfo, GameInfo, ActionButton } from "../components";
import {
  attack,
  attackSound,
  defense,
  defenseSound,
  player01 as player01icon,
  player02 as player02icon,
} from "../assets";
import { playAudio } from "../utils/animation.js";
import styles from "../styles";

const Battle = () => {
  const {
    contract,
    gameData,
    walletAddress,
    showAlert,
    setShowAlert,
    battleGround,
  } = useGlobalContext();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const navigate = useNavigate();
  const { battleName } = useParams();

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        let player01Address = null;
        let player02Address = null;

        if (
          gameData.activeBattle.player[0].toLowerCase() ===
          walletAddress.toLowerCase()
        ) {
          player01Address = gameData.activeBattle.player[0];
          player02Address = gameData.activeBattle.player[1];
        } else {
          player01Address = gameData.activeBattle.player[1];
          player02Address = gameData.activeBattle.player[0];
        }

        const p1TokenData = await contract.getPlyerToken(player01Address);
        const player01 = await contract.getPlayer(player01Address);
        const player02 = await contract.getPlayer(player02Address);

        const p1Att = p1TokenData.attackStrength.toNumber();
        const p1Def = p1TokenData.defensrStrength.toNumber();
        const p1H = player01.playerHealth.toNumber();
        const p1M = player01.playerMana.toNumber();
        const p2H = player02.playerHealth.toNumber();
        const p2M = player02.playerMana.toNumber();

        setPlayer1({
          ...player01,
          att: p1Att,
          def: p1Def,
          health: p1H,
          mana: p1M,
        });

        setPlayer2({ ...player02, att: "X", def: "X", health: p2H, mana: p2M });
      } catch (error) {
        console.log(error);
      }
    };
    if (contract && gameData.activeBattle) getPlayerInfo();
  }, [contract, gameData, battleName]);
  

  const makeAMove=async(choice)=>{
   playAudio(choice===1?attackSound:defenseSound);
   try{

    await contract.attackOrDefendChoice(choice,battleName)
    setShowAlert({
      status:true,
      type: 'info',
      message: `Initialising ${choice==1?'attack':'defense'}`

    });



   }catch(error){
    console.log(error);


   }
  }
  


  return (
    <div
      classname={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}
    >
      {showAlert.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}

      <PlayerInfo player={player2} playerIcon={player02icon} mt />
      {/* <h1 className='text-xl'>
          {battleName}
        </h1> */}
      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card card={player2} title={player2.playerName} cardRef="" playerTwo />

        <div className="flex items-center flex-row">
          <ActionButton
            imgUrl={attack}
            handleClick={() =>makeAMove(1)}
            restStyles="mr-2 hover:border-yellow-400"
          />
          <Card
            card={player2}
            title={player2.playerName}
            cardRef=""
            restStyles="mt-3"
          />

          <ActionButton
            imgUrl={defense}
            handleClick={() =>makeAMove(2)}
            restStyles="ml-6 hover:border-red-700"
          />
        </div>
      </div>

      <PlayerInfo player={player1} playerIcon={player01icon} mt />

      <GameInfo />
    </div>
  );
};

export default Battle;
