import React, { useState } from 'react';
import { Box, Button, Flex, Heading, ScaleFade, Text } from '@chakra-ui/react';
import Board from './Board';
import { getBingoBoardConfig } from '../utils/getBingoBoard';
import checkBingo from '../utils/checkBingo';

export interface Player {
    name: string;
    numbersCalled: number[];
    bingoCount: number;
}

export interface BingoPattern {
    type: 'row' | 'column' | 'diag1' | 'diag2';
    index: number;
}

interface GameProps {
    players: Player[];
    board: number[][];
    onNewGame: () => void;
}

const Game: React.FC<GameProps> = ({ players, onNewGame, board }) => {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [numbersCalled, setNumbersCalled] = useState<number[]>([]);
    const [winningPlayers, setWinningPlayers] = useState<Player[]>([]);

    const handleNumberCall = (number: number) => {
        setNumbersCalled([...numbersCalled, number]);

        const currentBoard = board;
        const currentBoardConfig = getBingoBoardConfig(currentBoard);

        //add numbersCalled to player
        let playerNumbers = [...players];
        playerNumbers[currentPlayerIndex].numbersCalled = [...numbersCalled, number];


        const newWinningPlayers: Player[] = [];
        for (const player of playerNumbers) {
            const patterns: BingoPattern[] = checkBingo(currentBoardConfig, new Set(player.numbersCalled)); // call updated checkBingo with player's numbersCalled
            console.log('patterns', patterns)
            if (patterns.length > 0) { // if there are any winning patterns
                console.log('patterns', patterns)
                player.bingoCount++;
                if (player.bingoCount === 3) { // if player has reached maximum of 6 bingos
                    setWinningPlayers([player]);
                    return; // stop the game
                } else {
                    newWinningPlayers.push(player); // add current player to winning players array
                }
            }
        }
        if (newWinningPlayers.length > 0) {
            setWinningPlayers(newWinningPlayers);
        } else {
            const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayerIndex);
        }
    };


    const handleNewGameClick = () => {
        setCurrentPlayerIndex(0);
        setNumbersCalled([]);
        setWinningPlayers([]);
        onNewGame();
    };

    return (
        <>
            <Box p={4}>
                <Heading>Bingo!</Heading>
                {numbersCalled.length > 24 ? (
                    <ScaleFade initialScale={0.3} in={true}>
                        <Flex direction="column" alignItems="center">
                            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                                {winningPlayers.filter(p => p.numbersCalled.length > 24).map(p => p.name).join(' and ')} Bingo Winner{winningPlayers.length > 1 ? 's' : ''}!
                            </Text>
                            <Button onClick={handleNewGameClick}>Start New Game</Button>
                        </Flex>
                    </ScaleFade>
                ) : (
                    <>
                        <Text mb={2} fontWeight={600}>Current Player: {players[currentPlayerIndex].name}</Text>
                        <br />
                        <Board board={board} numbersCalled={numbersCalled} onNumberCall={handleNumberCall} />
                        {winningPlayers.length > 0 && (
                            <ScaleFade initialScale={0.3} in={true}>
                                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                                    {winningPlayers.map(p => p.name).join(' and ')} Bingo{winningPlayers.length > 1 ? 's' : ''}!
                                </Text>
                            </ScaleFade>
                        )}
                    </>
                )}
            </Box>
        </>
    );
};

export default Game;
