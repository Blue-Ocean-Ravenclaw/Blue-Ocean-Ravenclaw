import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GameCard from '../../components/games/GameCard.jsx';
import {useState, useCallback, useReducer} from 'react';

export default function Games() {
  const initialState = {
    plays: 5,
    game: 'Dice',
    playing: false //Prevents game from rollng the dice again if you buy tickets
  }
  function reducer (state, action) { //Controls State of Game Page
    switch (action.type) { //TODO: Refactor so this can be re-used for every game
      case 'buyDice':
        return {...state, plays: state.plays + 5, playing: false};
      case 'playDice':
        return {...state, plays: state.plays - 1, playing: true};
      case 'Bingo':
        return {...state, game: 'Bingo'};
      case 'Dice':
        return {...state, game: 'Dice'};
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({type: 'playDice'}), []);

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 600,
      margin: 1,
      bgcolor: 'background.default',
    }}>
      <CardHeader sx={{
        bgcolor: 'main.primary'
      }}
      title='High Roller'>
      </CardHeader>
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Box sx={{
          display: 'flex'
        }}>
          <Button variant="contained" onClick={() => dispatch({type: 'Dice'})}>Dice</Button>
          <Button variant="contained" onClick={() => dispatch({type: 'Bingo'})}>Bingo</Button>
        <Button variant="contained" onClick={() => dispatch({type: 'buyDice'})}>+</Button>
        </Box>
        <GameCard
          game={gameState.game}
          plays={gameState.plays}
          playGame={playGame}
          playing={gameState.playing}
        />
      </CardContent>
    </Card>
  );
}