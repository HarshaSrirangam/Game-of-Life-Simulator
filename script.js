const gridElement = document.getElementById("grid");
const applyLogicBtn = document.getElementById("apply-logic-btn");
const resetBtn = document.getElementById("reset-btn");
const gridWidth = 600;
const gridHeight = 600;

let rows = 40;
let cols = 40;
let grid  = [];


function initializeGrid(rows, cols) {
    gridElement.innerHTML = '';
    grid = [];

    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;

    gridElement.style.gridTemplateColumns = `repeat(${cols}, ${cellWidth}px)`;
    gridElement.style.gridTemplateRows = `repeat(${rows}, ${cellHeight}px)`;

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;
            cell.addEventListener('click', () => {
                cell.classList.toggle('activateCell');
                if (cell.classList.contains('activateCell')) {
                    grid[i][j] = 1;
                } else {
                    grid[i][j] = 0;
                }
            });
            gridElement.appendChild(cell);
            grid[i][j] = 0;
        }
    }
}

function countNeighbors(row, col) {
    let liveNeighbors = 0;
    const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let [dx, dy] of neighbors) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols
        ) {
            liveNeighbors += grid[newRow][newCol];
            }
    }
    return liveNeighbors;
}

function applyLogic() {
    const newGrid = grid.map(row => [...row]);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const currentLiveNeighbors = countNeighbors(i, j);
            const cell = gridElement.children[i * cols + j];


            // Conway's Game of Life Rules:
            // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
            // 2. Any live cell with two or three live neighbors lives on
            // 3. Any live cell with more than three live neighbors dies (overpopulation)
             // 4. Any dead cell with exactly three live neighbors becomes alive (reproduction)

            if (grid[i][j] === 1) {
                if (currentLiveNeighbors < 2 || currentLiveNeighbors > 3) {
                    newGrid[i][j] = 0;
                    cell.classList.remove('activateCell');
                }
            }
            else {
                if (currentLiveNeighbors === 3) {
                    newGrid[i][j]= 1;
                    cell.classList.add('activateCell');
                }
            }
        }
    }
    grid = newGrid;
}

function resetGrid() {
    initializeGrid(rows, cols);
}
    


applyLogicBtn.addEventListener('click', applyLogic);
resetBtn.addEventListener('click', resetGrid);

initializeGrid(rows, cols);
