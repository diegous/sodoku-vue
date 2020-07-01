const isValid = (arr) => {
  const found = {};
  const isUnique = (n) => (n !== "." && found[n]) ? false : found[n] = true;
  return arr.every(isUnique);
}

const validRows = (board) => board.every(isValid);

const validColumns = (board) => {
  return [0,1,2,3,4,5,6,7,8].every(i => isValid(board.map((row) => row[i])));
}

const getSubgrid = (board, x, y) => {
  return board.slice(y,y+3).flatMap(row => row.slice(x,x+3))
}

const validSubsquares = (board) => {
  return [0,3,6].every(baseY => {
    return [0,3,6].every(baseX => {
      return isValid(getSubgrid(board, baseX, baseY));
    })
  })
}

export default (board) => validRows(board) && validColumns(board) && validSubsquares(board);
