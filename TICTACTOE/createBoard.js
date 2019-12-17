console.log('Here is a 3x3 board')
createBoard(3);

console.log('Here is a 9x9 board')
createBoard(9);

console.log('Here is a 12x12 board')
createBoard(12);



function createBoard(size) {
  var board = '';
  var totRows = (size * 2) - 1;
  var initColHead = '    '; //includes 3sp for header (col #0) and 3sp col #1
  var colHead = '   '; //includes 3sp for col header
  var colStart = '     '; // includes 5sp for col start
  var midCol = '|   '; //middle col divider 4sp
  var colEnd = '\n   '; // ends col 4sp
  var midRow = '---' // includes 3sp for header (col#0) and 3sp for col # 1
  var cornerRow = '+' // middle row divider 4sp

  //First row header
  for (var header = 0; header <= size - 1; header++) {
    if (header == 0) {
      board += (initColHead + (header + 1));
    }
    else if (header > 9){
        board += ('  ' + (header + 1));
    }
    else {
      board += (colHead + (header + 1));
    }
  }

  //rest of board
  for (var row = 0; row < size; row++) {
    if (row <9) {
        board += '\n' + (row + 1) + colStart;
    }
    else {
        board += '\n' + (row + 1) + '    ';
    }
    for (var col = 0; col < size - 1; col++) {
      board += midCol;
    }
    board += colEnd;

    if (row < size - 1) {
      for (var div = 0; div < (totRows); div++) {
        if (div % 2 != 0) {
          board += cornerRow;
        }
        else {
          board += midRow;
        }
      }
    }
  }
  console.log(board)
  return board
};
