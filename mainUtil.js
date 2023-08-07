'use strict'



// **************************************************************
// *  TIMER
// **************************************************************

//* HTML 
// < div id = "timer" > 00: 00 </ >



//* js:
const timerElement = document.getElementById('timer');

let seconds = 0;
let minutes = 0;

// Update the timer every second
const intervalId = setInterval(updateTimer, 1000);

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Format the time with leading zeros
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Update the timer element
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}



// ***************************************************************
// *  CREATING MATRIXES AND BOARDS
// ***************************************************************

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


// ***************************************************************
// *  RANDOM NUMS AND COLORS
// ***************************************************************

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




// ***************************************************************
// *  TIMERS
// ***************************************************************



// setInterval(function () { element.innerHTML += "Hello" }, 1000);


// setTimeout(() => {
//     console.log("Delayed for 1 second.");
// }, 1000);





// ***************************************************************
// *  POP-UPS
// ***************************************************************

function onOpenModal() {
    // Todo: show the modal and schedule its closing
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    setTimeout(onCloseModal, 5000)
}



// ***************************************************************
// *  NEIGHBORS
// ***************************************************************


function MinesCountNegs(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= mat[0].length) continue
            var cell = mat[i][j]
            if (cell.content === BOMB) count++
        }
    }
    return count
}








// ***************************************************************
// *  SCALING LEVELS 
// ***************************************************************


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


// ***************************************************************
// *  GETTING RANDOM POS ON A MATRIX
// ***************************************************************

function getEmptyCell(board) {
    // console.log(board)
    var emptyCells = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].negsBombsCount === 0) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}

function randomizeBombs(board, numBombs) {
    var emptyCells = getEmptyCell(board)
    var bombPos = []
    while (bombPos.length < numBombs) {
        var randomIdx = Math.floor(Math.random() * emptyCells.length)
        var randomPos = emptyCells.splice(randomIdx, 1)[0];
        var i = randomPos.i
        var j = randomPos.j

        board[i][j].isBomb = true;
        bombPos.push({ i, j });

    }

}






// function getEmptyCell(board) {
//     // console.log(board)
//     var emptyCells = []
//     for (let i = 0; i < board.length; i++) {
//         for (let j = 0; j < board[i].length; j++) {
//             if (board[i][j].gameElement === null && board[i][j].type !== WALL) {
//                 emptyCells.push({ i, j })
//             }
//         }
//     }
// }



// function renderRandomBall() {
//     const emptyCell = getEmptyCell(gBoard)
//     console.log('emptyCell', emptyCell)
//     gBoard[emptyCell.i][emptyCell.j].gameElement = BALL
//     // console.log('em', gBoard[emptyCell.i][emptyCell.j])
//     renderCell(emptyCell, BALL_IMG)
//     gBallOnFloor++
//     console.log('gBallFloor', gBallOnFloor)
// }

// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
// }