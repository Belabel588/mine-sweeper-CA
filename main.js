//* PAGE LOADING
// *****************************************************

// * globals:
// ********************
var gBoard;
const BOMB = '💣';
const FLAG = '🚩';
const EMPTY = '';
var firstClickIsOn = false;
var gLevel = {
  SIZE: 4,
  MINES: 2,
};

gGame = {
  isOn: false,
  shownCount: 0, markedCount: 0, secsPassed: 0
}

function onInit() {
  gBoard = createBoardData();
  console.table(gBoard);
  renderBoard(gBoard);
}

function getDifficulty(elBtn) {
  var diff = elBtn.classList;
  if (diff.contains('diff1')) {
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    gBoard = createBoardData(gLevel.SIZE);
  } else if (diff.contains('diff2')) {
    gLevel.SIZE = 8;
    gLevel.MINES = 14;
    gBoard = createBoardData(gLevel.SIZE);
  } else if (diff.contains('diff3')) {
    gLevel.SIZE = 12;
    gLevel.MINES = 32;
    gBoard = createBoardData(gLevel.SIZE);
  }
  elBtn.style.backgroundColor = 'rgba(41, 255, 144, 0.548)';
  gCount = 1;
  renderBoard(gBoard);
}

// **********************************************************
// * MODEL (DATA)
// **********************************************************

// TODO: 1. BUILDING A 4 X 4 EMPTY TABLE DATA ✅

function createBoardData() {
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = {
        negsBombsCount: 0,
        isShown: false,
        isBomb: false,
        isMarked: false,
      };
    }
  }

  // TODO 2. INSERTING BOMBS DATA INTO THE TABLE ✅

  // board[1][1].isBomb = BOMB
  // board[2][3].isBomb = BOMB
  return board;
}

// TODO: 5. USING THE COUNT BOMBS FUNCTION TO COUNT BOMBS AROUND EACH CELL WHEN CLICKED ✅

function onCellClicked(elCell, i, j) {
  console.log('i', i);
  console.log('j', j);
  var cellClicked = gBoard[i][j];


  cellClicked.isShown = true

  // if (cellClicked.negsBombsCount === 0)



  if (!firstClickIsOn) {
    randomizeBombs(gBoard, gLevel.MINES, { i, j });
    firstClickIsOn = true;
  }
  if (!cellClicked.isBomb) {
    gGame.shownCount++
  }
  cellClicked.negsBombsCount = bombCountNegs(gBoard, i, j);
  console.log('cellClicked', cellClicked);

  if (cellClicked.isShown === true && cellClicked.negsBombsCount === 0) {
    elCell.classList.add('clicked-button')
  }
  elCell.innerText = cellClicked.negsBombsCount;
  if (cellClicked.negsBombsCount === 0) {
    elCell.innerText = ''
  }

  if (cellClicked.isBomb) {
    cellClicked.isShown = true;
    gameOver(false);
  }

  if (gGame.shownCount === gLevel.SIZE * gLevel.SIZE - gLevel.MINES) {
    console.log(gGame.shownCount)
    gameOver(true)
  }
  if (cellClicked.isShown) return



  renderBoard(gBoard)
}

function gameOver(isWin) {
  var message;
  if (isWin) {
    message = alert('YOU WON!!');
  } else {
    message = alert('YOU LOST!!');
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        if (gBoard[i][j].isBomb) {
          gBoard[i][j].isShown = true;
        }
      }
    }
    renderBoard(gBoard);
  }

}



// function gameWon(isWin) {
//   var message;
//   for (var i = 0; i < gBoard.length; i++) {
//     for (var j = 0; j < gBoard[i].length; j++) {

//       var isWin = 
//   if (isWin) {
//         alert('YOU WON!!')
//       }
//     }
//   }
// }
// **********************************************************
// * DOM (UI)
// **********************************************************

// TODO: 3. RENDER  gBoard INTO elBoard✅

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board.length; j++) {
      var cell = board[i][j];
      // console.log(cell)
      var cellContent = '';

      if (cell.isMarked) {
        cellContent = FLAG;
      } else if (cell.isShown) {
        if (cell.isBomb) {
          cellContent = BOMB;
        }
      } else {
        cellContent = cell.negsBombsCount > 0 ? cell.negsBombsCount : '';
      }

      // if (cell.negsBombsCount > 0 && )

      //  TODO: 6. IMPLEMENTING THE BOMBS DETECTED INTO THE UI ✅

      var className = 'cellClicked cellClicked' + i + '-' + j;
      const title = `cell: ${i} , ${j}`;
      strHTML += `<td  title ="${title}" class= "${className}" onclick="onCellClicked(this,${i}, ${j})" oncontextmenu="onRightClick(event, ${i}, ${j}); return false"> ${cellContent}</td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}



var gameRestart = document.querySelector('.game-restart')
gameRestart.addEventListener('click', function () {
  location.reload()

})


// **********************************************************
// * UTILITY
// **********************************************************

// TODO: 4. CREATING A FUNCTION THAT COUNTS NEIGHBOR BOMBS✅

function bombCountNegs(mat, rowIdx, colIdx) {
  var count = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= mat[0].length) continue;
      var cell = mat[i][j];
      if (cell.isBomb) count++;
    }
  }
  return count;
}

function getEmptyCell(board) {
  // console.log(board)
  var emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].negsBombsCount === 0) {
        emptyCells.push({ i, j });
      }
    }
  }
  return emptyCells;
}

function randomizeBombs(board, numBombs, clickedPos) {
  var emptyCells = getEmptyCell(board);
  var bombPos = [];
  while (bombPos.length < numBombs) {
    var randomIdx = Math.floor(Math.random() * emptyCells.length);
    var randomPos = emptyCells.splice(randomIdx, 1)[0];
    if (randomPos.i === clickedPos.i && randomPos.j === clickedPos.j) continue;
    var i = randomPos.i;
    var j = randomPos.j;
    board[i][j].isBomb = true;
    bombPos.push({ i, j });
  }
}
