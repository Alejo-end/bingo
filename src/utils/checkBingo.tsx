export interface BingoBoardConfig {
  rows: number[][];
  columns: number[][];
  diag1: number[];
  diag2: number[];
}

function checkBingo(config: BingoBoardConfig, numbersCalled: number[]): boolean {
  const calledSet = new Set(numbersCalled);
  
  // Check rows
  for (let row of config.rows) {
    const rowSet = new Set(row);
    if (isSubset(calledSet, rowSet)) {
      return true;
    }
  }
  
  // Check columns
  for (let col of config.columns) {
    const colSet = new Set(col);
    if (isSubset(calledSet, colSet)) {
      return true;
    }
  }
  
  // Check diagonal 1
  const diag1Set = new Set(config.diag1);
  if (isSubset(calledSet, diag1Set)) {
    return true;
  }
  
  // Check diagonal 2
  const diag2Set = new Set(config.diag2);
  if (isSubset(calledSet, diag2Set)) {
    return true;
  }
  
  // No bingo pattern found
  return false;
}

function isSubset(superset: Set<any>, subset: Set<any>): boolean {
  for (let elem of subset) {
    if (!superset.has(elem)) {
      return false;
    }
  }
  return true;
}


export default checkBingo;
