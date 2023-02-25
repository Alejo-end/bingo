import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { conferencePhrases } from "../types";

interface SquareProps {
    number: number;
    numbersCalled: number[];
    onClick: () => void;
}



const Square: FC<SquareProps> = ({ number, numbersCalled, onClick }) => {
    return (
        <Box
            w={32}
            h={32}
            borderWidth={4}
            borderColor="gray.300"
            display="flex"
            alignItems="center"
            pointerEvents='painted'
            justifyContent="center"
            bg={number === 0 ? "white" : "gray.300" as "white" | "gray.300"}
            onClick={onClick}
            fontWeight={numbersCalled.includes(number)
                ? 'bold'
                : 'normal'}
        >
            <Text>{conferencePhrases[number-1]}</Text>
        </Box>
    );
};

export default Square;
