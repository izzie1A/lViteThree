

function printCellularAutomata(grid, generations) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  for (let generation = 0; generation < generations; generation++) {
    // console.clear(); // Clear console for better visibility
    console.log(`Generation: ${generation + 1}\n`);

    // Print current state
    for (let row = 0; row < numRows; row++) {
      let rowString = '';
      for (let col = 0; col < numCols; col++) {
        rowString += grid[row][col] ? '█' : ' ';
      }
      console.log(rowString);
    }

    // Calculate next generation
    const newGrid = [];
    for (let row = 0; row < numRows; row++) {
      const newRow = [];
      for (let col = 0; col < numCols; col++) {
        const neighbors = countNeighbors(grid, row, col);
        const isAlive = grid[row][col];

        // Apply Conway's Game of Life rules
        if (isAlive && (neighbors < 2 || neighbors > 3)) {
          newRow[col] = false;
        } else if (!isAlive && neighbors === 3) {
          newRow[col] = true;
        } else {
          newRow[col] = isAlive;
        }
      }
      newGrid.push(newRow);
    }

    // Update grid for the next generation
    grid = newGrid;

    // Delay to observe the changes (adjust as needed)
    sleep(100);
  }
}

function countNeighbors(grid, row, col) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const neighborRow = row + i;
      const neighborCol = col + j;

      // Check if neighbor is within bounds and not the current cell
      if (
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols &&
        !(i === 0 && j === 0)
      ) {
        count += grid[neighborRow][neighborCol] ? 1 : 0;
      }
    }
  }

  return count;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage
const numRows = 10;
const numCols = 20;
const initialGrid = initializeGrid(numRows, numCols);
printCellularAutomata(initialGrid, 10);

function initializeGrid(rows, cols) {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // Randomly initialize cells as alive or dead
      row.push(Math.random() < 0.5);
    }
    grid.push(row);
  }

  return grid;
}
console.log('m2 worked');
