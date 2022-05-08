import DiceGame from './dice/DiceGame.jsx';
import Bingo from './Bingo.jsx';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: DiceGame,
  Bingo: Bingo
});

export default function GameCard ({game, plays, playGame, playing}) {
  const [luck, setLuck] = useState(false); //If true you are guaranteed to win
  const Game = GameComponents[game]; //Selects Game

  return (
    <div className='game-card'>
      <div className='game-card-top'>
        <h2>{game}: {plays}</h2>
        <button onClick={() => setLuck((prev) => !prev)}>{luck ? 'win' : 'lose'}</button>
      </div>
      <div className='game-card-bottom'>
        <Game plays={plays} luck={luck} playGame={playGame} playing={playing} />
      </div>
    </div>
  );
}