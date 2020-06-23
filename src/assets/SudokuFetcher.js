const endpoint = "https://sugoku.herokuapp.com/board"

const SudokuFetcher = async function(difficulty) {
  const result = await fetch(`${endpoint}?difficulty=${difficulty}`);
  return result.json();
}

export default SudokuFetcher;
