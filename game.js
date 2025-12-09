const board = document.getElementById('game-board');
const startBtn = document.getElementById('start-btn');
const timeSpan = document.getElementById('time');
const movesSpan = document.getElementById('moves');
const winMessage = document.getElementById('win-message');

let tiles = [];
let emptyIndex = 8;
let moveCount = 0;
let time = 0;
let timer;

function shuffle(array) {
    for (let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    clearInterval(timer);
    time = 0;
    moveCount = 0;
    timeSpan.textContent = time;
    movesSpan.textContent = moveCount;
    winMessage.classList.add('hidden');

    board.innerHTML = '';
    tiles = [];
    let numbers = [...Array(8).keys()].map(n => n + 1);
    numbers.push('');
    shuffle(numbers);

    numbers.forEach((num, index) => {
        const tile = document.createElement('div');
        tile.textContent = num;
        tile.addEventListener('click', () => moveTile(index));
        board.appendChild(tile);
        tiles.push(tile);
        if(num === '') emptyIndex = index;
    });

    timer = setInterval(() => {
        time++;
        timeSpan.textContent = time;
    }, 1000);
}

function moveTile(index) {
    const adjacent = [
        emptyIndex - 1, emptyIndex + 1,
        emptyIndex - 3, emptyIndex + 3
    ];
    if (adjacent.includes(index)) {
        tiles[emptyIndex].textContent = tiles[index].textContent;
        tiles[index].textContent = '';
        emptyIndex = index;
        moveCount++;
        movesSpan.textContent = moveCount;
        checkWin();
    }
}

function checkWin() {
    const correct = [...Array(8).keys()].map(n => n + 1).concat('');
    const current = tiles.map(t => t.textContent);
    if (current.join() === correct.join()) {
        clearInterval(timer);
        winMessage.classList.remove('hidden');
    }
}

startBtn.addEventListener('click', createBoard);
createBoard();
