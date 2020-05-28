import React, { useState, useEffect } from "react";

function Board() {
  const gridWidth = 10;
  const gridHeight = 10;
  const mineCount = 8;
  const [grid, setGrid] = useState([]);
  const [minePositions, setMinePositions] = useState({});

  useEffect(() => {
    const _grid = [];
    for (let i = 0; i < gridHeight; i++) {
      const row = [];
      for (let j = 0; j < gridWidth; j++) {
        row.push(0);
      }
      _grid.push(row);
    }
    setGrid(_grid);

    let remainMineCount = mineCount;
    while (remainMineCount > 0) {
      const x = Math.round(Math.random() * gridWidth);
      const y = Math.round(Math.random() * gridHeight);
      const key = `${x}_${y}`;
      if (!minePositions[key]) {
        minePositions[key] = true;
        remainMineCount--;
      }
    }
    setMinePositions({ ...minePositions });

    console.log(_grid, minePositions);
  }, [minePositions]);

  function openMineField(x, y) {
    if (grid[x][y] !== 0) return;
    const key = `${x}_${y}`;
    if (minePositions[key] === true) {
      alert("game over");
      return;
    }

    grid[x][y] = 1;
    setGrid([...grid]);

    if (x > 0 && y > 0) {
      openMineField(x - 1, y - 1);
    }
    if (y > 0) {
      openMineField(x, y - 1);
    }
    if (x < gridWidth - 1 && y > 0) {
      openMineField(x + 1, y - 1);
    }
    if (x < gridWidth - 1) {
      openMineField(x + 1, y);
    }
    if (x < gridWidth - 1 && y < gridHeight - 1) {
      openMineField(x + 1, y + 1);
    }
    if (y < gridHeight - 1) {
      openMineField(x, y + 1);
    }

    // mở những ô không có mìn khi click.
  }

  /**
   * [
   * [0, 1, 0, 0, 0, 0, 0],
   * []
   * ]
   */
  return (
    <div>
      this is app page
      <p>hello</p>
    </div>
  );
}

export default Board;
