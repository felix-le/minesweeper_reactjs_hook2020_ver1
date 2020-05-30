import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";

function Board() {
  const gridWidth = 10;
  const gridHeight = 10;
  const mineCount = 8;
  const [lv1Grids, setLv1Grids] = useState([]);
  const [minePositions, setMinePositions] = useState({});
  const [cell, setCell] = useState({});
  useEffect(() => {
    const _grid = [];
    for (let i = 0; i < gridHeight; i++) {
      const row = [];
      for (let j = 0; j < gridWidth; j++) {
        let newObj = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };

        row.push(newObj);
      }
      _grid.push(row);
    }
    let remainMineCount = mineCount;
    while (remainMineCount > 0) {
      const x = Math.round(Math.random() * (gridWidth - 1));
      const y = Math.round(Math.random() * (gridHeight - 1));
      const key = `${x}_${y}`;
      if (!minePositions[key] && _grid.length > 0) {
        minePositions[key] = true;
        _grid[x][y].isMine = true;
        remainMineCount--;
      }
    }

    setLv1Grids(_grid);
    setMinePositions({ ...minePositions });

    console.log("OUTPUT: Board -> minePositions", minePositions);
  }, []);

  const getValue = (props) => {
    if (!props.isRevealed) {
      return props.isFlagged ? "🚩" : null;
    }
    if (props.isMine) {
      return "💣";
    }
    if (props.neighbour === 0) {
      return null;
    }
    return props.neighbour;
  };

  const _handleCellClick = (grid) => {
    console.log(grid);
    setCell(grid);
    const x = grid.x;
    const y = grid.y;
    console.log(x, y);
    lv1Grids[x][y].isRevealed = true;
    if (lv1Grids[x][y].isRevealed && lv1Grids[x][y].isFlagged) {
      return null;
    }
    if (lv1Grids[x][y].isMine) {
      alert("game over");
    }
    setLv1Grids([...lv1Grids]);
    // working on it.....
  };

  /**
   * [
   * [0, 1, 0, 0, 0, 0, 0],
   * []
   * ]
   */
  return (
    <div key={uuid()} className="game">
      {lv1Grids.length > 0 ? (
        lv1Grids.map((lv2Grids) =>
          lv2Grids.map((grid) => {
            return (
              <div
                key={uuid()}
                className={`
                cell ${grid.isRevealed ? "" : " hidden"} 
                ${grid.isMine ? " is-mine" : ""} 
                  ${grid.isFlagged ? " is-flag" : ""}
                `}
                onClick={() => _handleCellClick(grid)}
                value={grid}
              >
                {getValue(grid)}
              </div>
            );
          })
        )
      ) : (
        <p>nothing to show</p>
      )}
    </div>
  );
}

export default Board;
