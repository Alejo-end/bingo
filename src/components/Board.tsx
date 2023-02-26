import React from 'react';
import { Grid } from '@chakra-ui/react';
import Square from './Square';

interface BoardProps {
    board: number[][];
    numbersCalled: number[];
    onNumberCall: (number: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, numbersCalled, onNumberCall }) => {

    const handleNumberClick = (number: number) => {
        if (!numbersCalled.includes(number)) {
            onNumberCall(number);
        }
    };
    
    return (
    <Grid templateColumns={`repeat(${board.length}, 1fr)` as any} gap={2}>
            {board.map((row, i) =>
                row.map((number, j) => (
                    <Square key={`${i}-${j}`} number={number} onClick={() => handleNumberClick(number)} numbersCalled={numbersCalled}/>
                ))
            )}
        </Grid>
    );
};

export default Board;

