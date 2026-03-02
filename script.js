const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red';
const boardElement = document.getElementById('board');
const status = document.getElementById('status');

function createBoard() {
    board = [];
    boardElement.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = null;

            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => placePiece(c));

            boardElement.appendChild(cell);
        }
    }
}

function placePiece(col) {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            updateBoard();
            if (checkWinner(r, col)) {
                status.textContent = currentPlayer + " wint!";
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            return;
        }
    }
}

function updateBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        cell.classList.remove('red', 'yellow');
        if (board[r][c]) {
            cell.classList.add(board[r][c]);
        }
    });
}

function checkWinner(row, col) {
    return checkDirection(row, col, 1, 0) ||
           checkDirection(row, col, 0, 1) ||
           checkDirection(row, col, 1, 1) ||
           checkDirection(row, col, 1, -1);
}

function checkDirection(row, col, dr, dc) {
    let count = 1;
    count += countPieces(row, col, dr, dc);
    count += countPieces(row, col, -dr, -dc);
    return count >= 4;
}

function countPieces(row, col, dr, dc) {
    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (
        r >= 0 && r < rows &&
        c >= 0 && c < cols &&
        board[r][c] === currentPlayer
    ) {
        count++;
        r += dr;
        c += dc;
    }

    return count;
}

createBoard();