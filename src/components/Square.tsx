import { Box, Text, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import { conferencePhrases } from "../types";
import { motion } from "framer-motion";

interface SquareProps {
    number: number;
    numbersCalled: number[];
    onClick: () => void;
}

const Square: FC<SquareProps> = ({ number, numbersCalled, onClick }) => {
    const colorMode = useColorMode();
    return (
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.0, rotateZ: 30,  }}>
        <Box
            w={{"sm": "100%", "md": 32}}
            h={{"sm": "100%", "md": 32}}
            borderWidth={4}
            borderColor={colorMode.colorMode === 'light' ? "transparent.900" : "white.900"}
            borderRadius={10}
            display="flex"
            alignItems="center"
            pointerEvents='painted'
            fontSize={["sm", "md"]}
            justifyContent="center"
            wordBreak="break-word"
            bg={number === 0 ? "white" : "gray.300" as "white" | "gray.300"}
            onClick={onClick}
            backgroundColor={numbersCalled.includes(number) ? 'green.300' : 'blue.300'}
            bgGradient={numbersCalled.includes(number) ? [
                'radial(green.400, green.300)',
              ] : [
                'radial(blue.400, blue.300)',
              ]}
            fontWeight={numbersCalled.includes(number)
                ? 'extrabold'
                : 'normal'}
            zIndex={numbersCalled.includes(number) ? 3 : 1}
            rotate={numbersCalled.includes(number) ? 60 : 0}
        >
            <Text fontFamily="Epilogue">{conferencePhrases[number-1]}</Text>
        </Box>
        </motion.div>
    );
};

export default Square;
