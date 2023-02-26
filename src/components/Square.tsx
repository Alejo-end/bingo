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
            w={{"sm": 20, "md": 32}}
            h={{"sm": 20, "md": 32}}
            borderWidth={4}
            borderRadius={10}
            borderColor="gray.100"
            display="flex"
            alignItems="center"
            pointerEvents='painted'
            fontSize={["sm", "md"]}
            justifyContent="center"
            bg={number === 0 ? "white" : "gray.300" as "white" | "gray.300"}
            onClick={onClick}
            backgroundColor={numbersCalled.includes(number) ? 'green.300' : 'blue.300'}
            fontWeight={numbersCalled.includes(number)
                ? 'bold'
                : 'normal'}
            zIndex={numbersCalled.includes(number) ? 3 : 1}
            rotate={numbersCalled.includes(number) ? 60 : 0}
        >
            <Text>{conferencePhrases[number-1]}</Text>
        </Box>
    );
};

export default Square;
