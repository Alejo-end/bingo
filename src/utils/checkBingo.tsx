import { BingoPattern } from "../components/Game";

export interface BingoBoardConfig {
  rows: number[][];
  columns: number[][];
  diag1: number[];
  diag2: number[];
}

function checkBingo(config: BingoBoardConfig, numbersCalled: Set<number>): BingoPattern[] {
  const bingos: number[] = [];

  // Check rows
  for (let i = 0; i < config.rows.length; i++) {
    let bingo = true;
    for (let j = 0; j < config.rows[i].length; j++) {
      if (!numbersCalled.has(config.rows[i][j])) {
        bingo = false;
        break;
      }
    }
    if (bingo) {
      bingos.push(i);
    }
  }

  // Check columns
  for (let i = 0; i < config.columns.length; i++) {
    let bingo = true;
    for (let j = 0; j < config.columns[i].length; j++) {
      if (!numbersCalled.has(config.columns[i][j])) {
        bingo = false;
        break;
      }
    }
    if (bingo) {
      bingos.push(i + config.rows.length);
    }
  }

  // Check diagonals
  let diag1Bingo = true;
  let diag2Bingo = true;
  for (let i = 0; i < config.diag1.length; i++) {
    if (!numbersCalled.has(config.diag1[i])) {
      diag1Bingo = false;
    }
    if (!numbersCalled.has(config.diag2[i])) {
      diag2Bingo = false;
    }
  }
  if (diag1Bingo) {
    bingos.push(config.rows.length + config.columns.length);
  }
  if (diag2Bingo) {
    bingos.push(config.rows.length + config.columns.length + 1);
  }

  return bingos.map((bingo) => {
    if (bingo < config.rows.length) {
      return { type: 'row', index: bingo };
    } else if (bingo < config.rows.length + config.columns.length) {
      return { type: 'column', index: bingo - config.rows.length };
    } else if (bingo === config.rows.length + config.columns.length) {
      return { type: 'diag1', index: 0 };
    } else {
      return { type: 'diag2', index: 0 };
    }
  }
  );
}

export default checkBingo;