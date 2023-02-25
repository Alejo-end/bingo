import React, {useState} from 'react';
import { Grid, Text } from '@chakra-ui/react';
import { getBingoBoardConfig } from '../utils/getBingoBoard';
import checkBingo from '../utils/checkBingo';
import Square from './Square';

interface BoardProps {
    board: number[][];
    numbersCalled: number[];
    onNumberCall: (number: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, numbersCalled, onNumberCall }) => {
    const boardConfig = getBingoBoardConfig(board);

    const handleNumberClick = (number: number) => {
        if (!numbersCalled.includes(number)) {
            onNumberCall(number);
        }
    };
    const checkWin = checkBingo(boardConfig, numbersCalled);
    
    return (
        <>
    <Grid templateColumns={`repeat(${board.length}, 1fr)` as any} gap={2}>
            {board.map((row, i) =>
                row.map((number, j) => (
                    <Square key={`${i}-${j}`} number={number} onClick={() => handleNumberClick(number)} numbersCalled={numbersCalled}/>
                ))
            )}
        </Grid>
        {checkWin && 
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                You win!
            </Text>
}
        </>
    );
};

export default Board;

