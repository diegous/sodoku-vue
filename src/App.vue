<template>
  <div id="app">
    <div class="sudoku-board">
      <div v-for="(row, rowIndex) in board"
           v-bind:key="rowIndex"
           class="row">

        <Cell v-for="(cell, cellIndex) in row"
              v-bind:key="cellIndex"
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

export default {
  name: 'App',
  components: {
    Cell,
  },
  methods: {
    solve: function() {
      const stringBoard = this.board.map(row => row.map(cell => cell.value));
      const solver = new SudokuSolver(stringBoard);
      solver.solve();

      for (let y = 0; y < 9; y++)
        for (let x = 0; x < 9; x++)
          this.board[y][x].value = stringBoard[y][x]
    },
    newGame: async function(difficulty) {
      const game = await SudokuFetcher(difficulty);

      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          this.board[y][x].value = String(game.board[y][x] || ".");
          this.board[y][x].original = game.board[y][x] != 0;
        }
      }
    }
  },
  data: () => {
    return {
      board: new Array(9).fill().map(() =>
               new Array(9).fill().map(() => ({ value: ".", original: false }))
             )
    }
  },
  created: async function() {
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
