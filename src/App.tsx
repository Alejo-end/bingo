import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  IconButton,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/common/ColorModeSwitcher"
import Game from "./components/Game"
import { Player } from "./types"
import './styles.css'
import { FaRedo } from "react-icons/fa"

const bingoBoard = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
]

export const App = () => {
  const [numbersCalled, setNumbersCalled] = React.useState<number[]>([13]);

  const handleNumberCall = (number: number) => {
    setNumbersCalled(prevNumbersCalled => [...prevNumbersCalled, number]);
  };

  const handleOnNewGame = () => {
    setNumbersCalled([]);
    handleNumberCall(13);
  };
  const player1: Player = {
    name: "Player 1",
    numbersCalled: numbersCalled,
    bingoCount: [],
  };


  return (
    <ChakraProvider theme={theme} >
      <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack justifySelf="flex-end" alignItems="flex-end">
          <ColorModeSwitcher/>
          <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={handleOnNewGame}
            icon={<FaRedo />}
            aria-label={`Restart`}
          /></VStack>
          <VStack spacing={8}>
            <Game onNewGame={handleOnNewGame} players={[player1]} board={bingoBoard} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
