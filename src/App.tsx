import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Game, { Player } from "./components/Game"

const bingoBoard = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
]

export const App = () => {
  const [numbersCalled, setNumbersCalled] = React.useState<number[]>([]);

  const handleNumberCall = (number: number) => {
    setNumbersCalled(prevNumbersCalled => [...prevNumbersCalled, number]);
  };

  const handleOnNewGame = () => {
    setNumbersCalled([]);
    handleNumberCall(13);
  };
  const player1: Player = {
    name: "Player 1",
    board: bingoBoard,
    numbersCalled: numbersCalled,
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Game onNewGame={handleOnNewGame} players={[player1, player1]}/>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
