const gridElement = document.getElementById("grid");
const applyLogicBtn = document.getElementById("apply-logic-btn");
const applyLogicContinuouslyBtn = document.getElementById("apply-logic-continuously-btn");
const resetBtn = document.getElementById("reset-btn");

let rows = 100;
let cols = 100;
let grid = [];
let startEvolution = false;

function calculateGridSize() {
    const container = document.querySelector('.container');
    const controlsWidth = document.querySelector('.controls').offsetWidth;
    const availableWidth = container.clientWidth - controlsWidth - 80; // Subtract padding and gap
    const availableHeight = window.innerHeight - 100; // Subtract some padding
    
    // Calculate the maximum grid size that fits the screen
    const maxSize = Math.min(availableWidth, availableHeight);
    
    return {
        width: maxSize,
        height: maxSize,
        cellSize: maxSize / cols
    };
}

function initializeGrid(rows, cols) {
    applyLogicContinuouslyBtn.textContent = "Start Evolution";
    startEvolution = false;
    gridElement.innerHTML = '';
    grid = [];

    const { width, height, cellSize } = calculateGridSize();

    gridElement.style.width = `${width}px`;
    gridElement.style.height = `${height}px`;
    gridElement.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    gridElement.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
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
    const scalars = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let [dx, dy] of scalars) {
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

            if (grid[i][j] === 1) {
                if (currentLiveNeighbors < 2 || currentLiveNeighbors > 3) {
                    newGrid[i][j] = 0;
                    cell.classList.remove('activateCell');
                }
            }
            else {
                if (currentLiveNeighbors === 3) {
                    newGrid[i][j] = 1;
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function evolve() {
    startEvolution = !startEvolution;
    if (startEvolution) {
        applyLogicContinuouslyBtn.textContent = "Stop Evolution";
        while (startEvolution) {
            applyLogic();
            await sleep(100);
        }
    }
    else {
        applyLogicContinuouslyBtn.textContent = "Start Evolution";
    }
}

// Add resize event listener
window.addEventListener('resize', () => {
    initializeGrid(rows, cols);
});

applyLogicBtn.addEventListener('click', applyLogic);
applyLogicContinuouslyBtn.addEventListener('click', evolve);
resetBtn.addEventListener('click', resetGrid);

initializeGrid(rows, cols);
