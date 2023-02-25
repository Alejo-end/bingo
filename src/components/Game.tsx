import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Board from './Board';
import { getBingoBoardConfig } from '../utils/getBingoBoard';
import checkBingo from '../utils/checkBingo';

export interface Player {
  name: string;
  board: number[][];
  numbersCalled: number[];
}

interface GameProps {
  players: Player[];
  onNewGame: () => void;
}

const Game: React.FC<GameProps> = ({ players, onNewGame }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [numbersCalled, setNumbersCalled] = useState<number[]>([]);
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);

  const handleNumberCall = (number: number) => {
    setNumbersCalled([...numbersCalled, number]);

    const currentBoard = players[currentPlayerIndex].board;
    const currentBoardConfig = getBingoBoardConfig(currentBoard);

    const hasWon = checkBingo(currentBoardConfig, [...numbersCalled, number]);
    
    if (hasWon) {
        setWinningPlayer(players[currentPlayerIndex].name);
    } else {
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(nextPlayerIndex);
    }
    };

  const handleNewGameClick = () => {
    setCurrentPlayerIndex(0);
    setNumbersCalled([]);
    setWinningPlayer(null);
    onNewGame();
  };

  return (
    <>
    <Box p={4}>
        <h2>Bingo</h2>
      {winningPlayer ? (
        <Flex direction="column" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {winningPlayer} wins!
          </Text>
          <Button onClick={handleNewGameClick}>Start New Game</Button>
        </Flex>
      ) : (
        <>
          <Text mb={2}>Current Player: {players[currentPlayerIndex].name}</Text>
          <Board
            board={players[currentPlayerIndex].board}
            numbersCalled={numbersCalled}
            onNumberCall={handleNumberCall}
          />
        </>
      )}
    </Box>
    </>
  );
};

export default Game;
