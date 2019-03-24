module.exports = function solveSudoku(matrix) {
  //1. to define zeros in matrix
  function searchEmptySpaces () {
    let arrWithZeros = [];
    for (let i = 0; i < 9; i++) {

      for (let j = 0; j < 9; j++) {

        if(matrix[i][j] === 0) {
          arrWithZeros.push ({row: i, column: j})
        }
      }
    }
    return arrWithZeros;
  }

  //2. to define row with empty spaces
  function searchEmptySpacesInRow (estimatedNumber, row) {
    for (let i = 0; i < 9; i++) {
      if (matrix[row][i] === estimatedNumber) {
        return true;
      }
    }
    return false;
  }

//3. to define column with empty spaces
  function searchEmptySpacesInColumn(estimatedNumber, col) {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][col] === estimatedNumber) {
        return true;
      }
    }
    return false;
  }

  //4. to define matrix 3x3 with empty spaces
  function searchEmptySpacesInMatrix(estimatedNumber, row, col) {
    for (let i = 0; i < 3; i++) {

      for (let j = 0; j < 3; j++) {
        if (matrix[row + i][col + j] === estimatedNumber) {
          return true;
        }
      }
    }
    return false;
  }

  //5. implement sudoku decision
  function solveSudoku(emptySpacesArr) {
    let item = emptySpacesArr[0];
      if (!item) {
        return true;
      }
      for(let estimatedNumber = 1; estimatedNumber < 10; estimatedNumber++) {
        if (!searchEmptySpacesInRow(estimatedNumber, item.row) && !searchEmptySpacesInColumn(estimatedNumber, item.column) && !searchEmptySpacesInMatrix(estimatedNumber, item.row - item.row % 3, item.column - item.column % 3)) {
          matrix[item.row][item.column] = estimatedNumber;
          emptySpacesArr.shift();
          
          if(solveSudoku(emptySpacesArr)) {
            return true;
          }
          matrix[item.row][item.column] = 0;
          emptySpacesArr.unshift(item);
      }
    }
    return false;
  }
  let emptySpacesArr = searchEmptySpaces();
 
  if(solveSudoku(emptySpacesArr)) return matrix;
}
