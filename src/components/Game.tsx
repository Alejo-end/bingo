import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, ScaleFade, Text, useColorMode } from '@chakra-ui/react';
import Board from './Board';
import { getBingoBoardConfig } from '../utils/getBingoBoard';
import checkBingo from '../utils/checkBingo';
import { Player, BingoPattern } from '../types';
import ShowerOfEmojis from './game/ShowerOfEmojis';
import ParallaxText from './game/ParallelText';

interface GameProps {
    players: Player[];
    board: number[][];
    onNewGame: () => void;
}

const Game: React.FC<GameProps> = ({ players, onNewGame, board }) => {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [numbersCalled, setNumbersCalled] = useState<number[]>([13]);
    const [winningPlayers, setWinningPlayers] = useState<Player[]>([]);
    const [patterns, setPatterns] = useState<BingoPattern[]>([]);
    const [isBingo, setIsBingo] = useState<boolean>(false);

    // Check if a new pattern has been completed and add it to the patterns state
    useEffect(() => {
        const currentBoardConfig = getBingoBoardConfig(board);
        const newPatterns: BingoPattern[] = checkBingo(currentBoardConfig, new Set(numbersCalled));
        console.log(currentBoardConfig, newPatterns)
        setPatterns(newPatterns);
        setIsBingo(false)
    }, [board, numbersCalled]);

    // Check if a new bingo has been completed
    useEffect(() => {
        const currentPlayer = players[currentPlayerIndex];
        const newBingoCount = patterns.length;
        console.log(newBingoCount, currentPlayer);
        if (newBingoCount > currentPlayer.bingoCount.length) {
            setIsBingo(true);
            currentPlayer.bingoCount = patterns;
            if (currentPlayer.numbersCalled.length > 24) {
                setWinningPlayers([currentPlayer]);
            }
        }
    }, [currentPlayerIndex, patterns, players]);

    // Call this function when a number is called
    const handleNumberCall = (number: number) => {
        setNumbersCalled((prevNumbers) => [...prevNumbers, number]);
        currentPlayer.numbersCalled.push(number);
        console.log(number, numbersCalled, currentPlayer.numbersCalled, currentPlayer.bingoCount)
    };

    // Call this function when a new game is started
    const handleNewGameClick = () => {
        setCurrentPlayerIndex(0);
        setNumbersCalled([13]);
        setWinningPlayers([]);
        setPatterns([]);
        onNewGame();
    };

    // Get the current player object
    const currentPlayer = players[currentPlayerIndex]!;

    // Check if the game is over
    const gameOver =
        winningPlayers.length > 0 &&
        currentPlayer.bingoCount.length >= 6 &&
        numbersCalled.length > 24;


    const colorMode = useColorMode()
    return (
        <>
            <Box p={4}>
                {gameOver ? (
                    <ScaleFade initialScale={0.3} in={true}>
                        <Flex direction="column" alignItems="center">
                            <ShowerOfEmojis />
                            <Box backgroundColor="blue.900" p={20} border="4px solid white" borderRadius={20} >
                                <Heading as="h1" fontFamily={'Climate Crisis'} color="white">
                                    Bingo!
                                </Heading>
                                <Text fontSize="2xl" fontWeight="bold" fontFamily="Epilogue" mb={2} color="white">
                                    {winningPlayers.map((p) => p.name).join(' and ')}{' '}
                                    {winningPlayers.length > 1 ? 'are' : 'is'} the Winner!
                                </Text>
                                <Button onClick={handleNewGameClick} fontFamily="Epilogue"  color={colorMode.colorMode === 'light' ? "black" : "white"} _hover={{ color: "gray.300" }} size="lg">Start New Game</Button>
                            </Box>
                        </Flex>
                    </ScaleFade>
                ) : (
                    <>

                        {isBingo && (
                            <Heading lineHeight='tall' position="absolute" top={0} left={0} zIndex={-1}>
                                <ParallaxText children={'Bingo_'} baseVelocity={0.25} />
                                <ParallaxText children={"Player 1_"} baseVelocity={0.25} />
                            </Heading>

                        )}
                        <Board board={board} numbersCalled={players[currentPlayerIndex].numbersCalled} onNumberCall={handleNumberCall} />
                        <br />
                        <Text fontFamily="Epilogue" mb={2} fontWeight={600}>Current Player: {currentPlayer.name}</Text>
                        <br/>
                        <Button onClick={handleNewGameClick} fontFamily="Epilogue"  color={colorMode.colorMode === 'light' ? "black" : "white"} _hover={{ color: "gray.300" }} size="lg">Restart</Button>
                    </>
                )}
            </Box>
        </>
    );
};

export default Game;
