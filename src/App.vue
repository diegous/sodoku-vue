<template>
  <div id="app">
    <div class="sudoku-board">
      <div v-for="(row, rowIndex) in board"
           v-bind:key="rowIndex"
           class="row">

        <Cell v-for="(cell, cellIndex) in row"
              v-on:update:selected="updateSelected"
              v-bind:key="cellIndex"
              v-bind:x="cellIndex"
              v-bind:y="rowIndex"
              v-bind:cell="cell"/>
      </div>
    </div>

    <br>
    <button v-on:click="solve">Solve</button>
    <button v-on:click="newGame('easy')">New easy</button>
    <button v-on:click="newGame('medium')">New medium</button>
    <button v-on:click="newGame('hard')">New hard</button>
  </div>
</template>

<script>
import Cell from './components/Cell.vue'
import SudokuSolver from './assets/SudokuSolver.js'
import SudokuFetcher from './assets/SudokuFetcher.js'
import validBoard from './assets/validBoard.js'

export default {
  name: 'App',
  components: {
    Cell,
  },
  methods: {
    plainBoard: function() {
      return this.board.map(row => row.map(cell => cell.value))
    },
    solve: function() {
      const stringBoard = this.plainBoard();
      const solver = new SudokuSolver(stringBoard);
      solver.solve();

      for (let y = 0; y < 9; y++)
        for (let x = 0; x < 9; x++)
          this.board[y][x].value = stringBoard[y][x]
    },
    newGame: async function(difficulty) {
      const game = await SudokuFetcher(difficulty);
      this.selected.x = null;
      this.selected.y = null;

      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          this.board[y][x].value = String(game.board[y][x] || ".");
          this.board[y][x].original = game.board[y][x] != 0;
        }
      }
    },
    selectedCell: function() {
      return this.board[this.selected.y][this.selected.x];
    },
    updateSelected: function({ x, y }) {
      if (Number.isInteger(this.selected.y) &&
          Number.isInteger(this.selected.x))
        this.selectedCell().selected = false;

      this.selected.x = x;
      this.selected.y = y;
      this.selectedCell().selected = true;
    },
    updateCellValue: function({ key }) {
      if (!Number.isInteger(this.selected.y)) return;
      if (!Number.isInteger(this.selected.x)) return;
      if (this.selectedCell().original) return;

      if ("123456789".indexOf(key) >= 0) {
        this.selectedCell().value = key;
        this.selectedCell().error = !validBoard(this.plainBoard());
      } else if (key === "Delete" || key === "Backspace") {
        this.selectedCell().value = ".";
        this.selectedCell().error = false;
      }
    }
  },
  data: () => {
    return {
      selected: { x: null, y: null },
      board:
        new Array(9).fill().map(() =>
          new Array(9).fill().map(() => {
            return {
              value: ".",
              original: false,
              selected: false,
              error: false
            }
          })
        )
    }
  },
  created: async function() {
    window.addEventListener('keydown', this.updateCellValue);
    this.newGame("easy");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.sudoku-board {
  display: inline-block;
}

.sudoku-board .row:nth-child(3n+4) {
  border-top-color: black;
  border-top-width: 2px;
  border-top-style: solid;
}

.row {
  display: flex;
}

.row .cell:nth-child(3n+4) {
  border-left-color: black;
  border-left-width: 2px;
}
</style>
