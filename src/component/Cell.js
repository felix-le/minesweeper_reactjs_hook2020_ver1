import React from "react";

/**
 * when clicking, Cell has four values respectively four cases:
 * 1. Revealed - show or hidden
 * 2. mine > has mine
 * 3. neighbour - 8 cells near by the open cell
 * 4. hidden
 * We get all values from cell from a function getValue()
 */

const Cell = ({ value, onClick }) => {
  const getValue = () => {
    /**
      * isRevealed: hidden
        1.1 flagged
        1.2 null
      * !isRevealed: neighbour
        2.1. mine
        2.2.1. null
        2.2.2 show-number

        * ==> value: After clicking (=> !isRevealed)
        we seem all the cells are neighbour. As the result, return neighbour is default and we have some other values:
        mine => return 💣
        flagged => return 🚩
        neighbour === 0 => return null (for opening this cell)
        neighbour !== 0 => return the number 

        * ==> class:
        isRevealed? hidden or ""
        isMine ? is-mine or ""
        isFlagged ? is-flag or ""
     */
    const { value } = e.target;
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour) {
      return null;
    }
    return value.neighbour;
  };
  let classNames =
    "cell" +
    (value.isRevealed ? "hidden" : "") +
    (value.isMine ? " is-mine" : "") +
    (value.isFlagged ? "is-flag" : "");
  return (
    <div className={classNames} onClick={onClick}>
      {getValue()}
    </div>
  );
};
export default Cell;
