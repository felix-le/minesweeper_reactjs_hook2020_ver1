Before build a project you should think what thing we will build, UI, rules, features... Actions, and the result of actions.

# What - UI

1. Layout
   A broad renders 8x8 cells (in total = 64 cells) and 10 of the cells will contain mines.

2. Render:

- 64 cells (includes 10 cells will contain mines)
- a broad contain all the cells
- A components has logic for game

3. Rules:
   3.1 general:

- Find all the mines in the cells on the broad by clicking
- If a cell withouts the mine, Show number of mines surrounding the cell
- if you consider a cell contains mine, you can flag it by right clicking it. The cell will not be open.

  3.2 Loose:

- If you open the cell which contains the mine

  3.3 win:

- if you flag all cells contain mines.

# How to build a cell - theory

## 1. create 3 components:

- **Game** contains the number of cells (height, width) and the number of mines.
- **Cell** render each cell. Use getValue() method to determine a suitable value to be rendered by each cell.
- **Broad** hold the values of each cell, game status - in progress or won or lose, count all the mines and a track of mines that remain to be found (flagged)

## 2. Create Cell component

[diagram flows](https://drive.google.com/file/d/1fBEa0r8rGQT5SIj68bhZybSvh305H-zp/view?usp=sharing)

### 1. isRevealed: hidden

1.1 flagged
1.2 null

### 2. !isRevealed: neighbour

2.1. mine
2.2.1. null
2.2.2 show-number

#### ==> value: After clicking (=> !isRevealed)

we seem all the cells are neighbour. As the result, return neighbour is default and we have some other values:
mine => return 💣
flagged => return 🚩
neighbour === 0 => return null (for opening this cell)
neighbour !== 0 => return the number

#### ==> class:

isRevealed? hidden or ""
isMine ? is-mine or ""
isFlagged ? is-flag or ""
