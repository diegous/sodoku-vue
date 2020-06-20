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
  </div>
</template>

<script>
import Cell from './components/Cell.vue'
import SudokuSolver from './assets/SudokuSolver.js'

export default {
  name: 'App',
  components: {
    Cell,
  },
  methods: {
    solve: function() {
      const board = this.board;
      const solver = new SudokuSolver(board);
      solver.solve();
      this.board = [...board];
    }
  },
  data: () => {
    return {
      board: [
        [".", "9", ".", ".", "6", "2", ".", ".", "."],
        ["3", ".", "6", "5", ".", ".", ".", "9", "."],
        [".", ".", ".", ".", ".", "8", "2", ".", "."],
        [".", ".", "2", ".", ".", ".", "1", ".", "9"],
        ["5", ".", "3", "2", "9", "6", ".", ".", "."],
        ["8", "7", "9", ".", ".", ".", ".", "2", "."],
        [".", ".", ".", "1", ".", ".", ".", ".", "."],
        ["1", ".", "7", ".", ".", ".", "9", "4", "5"],
        [".", ".", "5", ".", ".", "9", "8", "3", "."]
      ]
    }
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
