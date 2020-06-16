// JS reimplementation of a sudoku solver written in Ruby
// https://github.com/diegous/sudoku-solver

export default class SudokuSolver {
  constructor(matrix) {
    this.matrix = matrix;
  }

  row(y) {
    return this.matrix[y];
  }

  column(x) {
    return this.matrix.map(row => row[x]);
  }

  isEmpty(x,y) {
    return this.matrix[y][x] === ".";
  }

  write(n, x, y) {
    this.matrix[y][x] = n;
  }

  erase(x,y) {
    this.write(".", x, y);
  }

  subgridNeighbors(x,y) {
    const baseX = x - (x % 3);
    const baseY = y - (y % 3);

    return this.matrix.slice(baseY, baseY+3)
                      .flatMap(row => row.slice(baseX, baseX+3))
  }

  unknowns() {
    const unknowns = []

    for (let x = "0"; x < "9"; x++)
      for (let y = "0"; y < "9"; y++)
        if (this.isEmpty(x,y))
          unknowns.push([x,y])

    return unknowns;
  }

  candidates(x,y) {
    return [1,2,3,4,5,6,7,8,9]
      .map(String)
      .filter( n => !this.row(y).includes(n) )
      .filter( n => !this.column(x).includes(n) )
      .filter( n => !this.subgridNeighbors(x,y).includes(n) )
  }

  solveNext(unknowns) {
    if (unknowns.length === 0) return true;
    const [[x,y], ...rest] = unknowns;

    return this.candidates(x,y).some(n => {
      this.write(n,x,y);
      if (this.solveNext(rest)) return true;
      this.erase(x,y)
    })
  }

  solve() {
    this.solveNext(this.unknowns());
    return this.matrix
  }
}
