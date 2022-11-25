type TwoDimensionalBoard<T> = Array<T>;

const isDiagonalWinner = <T>(symbol: T, board: TwoDimensionalBoard<T[]>) => {
  return getDiagonalMoves(board).some((moves) =>
    moves.every((move) => move === symbol)
  );
};

const getDiagonalMoves = <T>(board: TwoDimensionalBoard<T[]>) => {
  const diagonalMoves = [];
  const equalBasedDiagonal = []; // i === j
  const sumBasedDiagonal = []; // i + j == n -1

  // Check for left to right diagonal moves
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (row === col) {
        equalBasedDiagonal.push(board[row][col]);
      }
    }
  }

  // Check for right to left diagonal moves
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (row + col === board.length - 1) {
        sumBasedDiagonal.push(board[row][col]);
      }
    }
  }

  diagonalMoves.push(equalBasedDiagonal, sumBasedDiagonal);
  return diagonalMoves;
};

const isVerticalWinner = <T>(symbol: T, board: TwoDimensionalBoard<T[]>) => {
  return transposeBoard(board).some((moves) =>
    moves.every((move) => move === symbol)
  );
};

const transposeBoard = <T>(board: TwoDimensionalBoard<T[]>) => {
  return board.map((_, index) => board.map((row) => row[index]));
};

const isHorizontalWinner = <T>(symbol: T, board: TwoDimensionalBoard<T[]>) => {
  return board.some((moves) => moves.every((move) => move === symbol));
};

const createTwoDimensionalBoard = <T>(board: T[]): TwoDimensionalBoard<T[]> => {
  return [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)];
};

export const isWinner = <T>(symbol: T, board: T[]) => {
  const twoDimensionalBoard = createTwoDimensionalBoard(board);

  return (
    isHorizontalWinner(symbol, twoDimensionalBoard) ||
    isVerticalWinner(symbol, twoDimensionalBoard) ||
    isDiagonalWinner(symbol, twoDimensionalBoard)
  );
};

export const isGameOver = <T>(board: T[]) => {
  return createTwoDimensionalBoard(board).every((row) =>
    row.every((move) => !!move)
  );
};
