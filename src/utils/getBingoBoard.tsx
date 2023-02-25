import { BingoBoardConfig } from "./checkBingo";

export const getBingoBoardConfig = (board: number[][]): BingoBoardConfig => {
    const numRows = board.length;
    const numCols = board[0].length;
  
    const rows = board;
    const columns = Array.from({ length: numCols }, (_, colIndex) =>
      Array.from({ length: numRows }, (_, rowIndex) => board[rowIndex][colIndex])
    );
  
    const diag1 = Array.from({ length: numRows }, (_, i) => board[i][i]);
    const diag2 = Array.from({ length: numRows }, (_, i) => board[i][numRows - i - 1]);
  
    return {
      rows,
      columns,
      diag1,
      diag2,
    };
  };
  