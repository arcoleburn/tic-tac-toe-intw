import { TicTacToeBoard, BoardSquareValue } from "@utilities/ticTacToe";

import { useCallback, useState } from "react";

import { isGameOver } from "@utilities/ticTacToe";
import { useScore } from "../Score";

const createNewTicTacToeBoard = () => Array(9).fill(null);

const fetchWinCheck = async (url: string, data: any) => {
  const response = await fetch(url, data);
  const finalData = await response.json();
  return finalData;
};

export const useTicTacToe = () => {
  const { addWinO, addWinX } = useScore();
  const [board, setBoard] = useState<TicTacToeBoard>(createNewTicTacToeBoard);
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<BoardSquareValue>(null);

  const currentTurn: BoardSquareValue = isX ? "X" : "O";

  const handleSquareSelect = useCallback(
    async (selectedSquare: number) => {
      if (board[selectedSquare]) {
        return;
      }
      const newBoard = [...board];
      newBoard[selectedSquare] = currentTurn;
      setBoard(newBoard);

      const data = {
        board: newBoard,
        player: currentTurn,
      };

      const winCheck = await fetchWinCheck(
        "https://tic-tac-toe-intw.vercel.app/api/wincheck",
        { method: "POST", body: JSON.stringify(data) }
      );

      if (winCheck.gameOver) {
        setWinner(winCheck.winner);
        winCheck.winner === "X" ? addWinX() : addWinO();
      }
      setIsX(!isX);
    },
    [board, isX]
  );

  const reset = () => {
    setBoard(createNewTicTacToeBoard());
    setIsX(true);
    setWinner(null);
  };

  return {
    board,
    handleSquareSelect,
    reset,
    currentTurn,
    winner,
    isGameOver: isGameOver(board),
  };
};
