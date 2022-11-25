import { TicTacToeBoard, Player } from "@utilities/ticTacToe";

import { useCallback, useEffect, useState } from "react";


const initialBoard = Array(9).fill(null);

export const useTicTacToe = () => {
  const [board, setBoard] = useState<TicTacToeBoard>(initialBoard);
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<Player>();

  const currentTurn = isX ? "X" : "O";

  const handleSquareSelect =  useCallback(
    async (selectedSquare: number) => {
      if (board[selectedSquare]) {
        return;
      }

      const newBoard = [...board];
      newBoard[selectedSquare] = currentTurn;
      setBoard(newBoard);

      const data = {
        board: newBoard,
        player: currentTurn
      }
      const winCheck = await (fetch('http://localhost:3000/api/wincheck',{
        method:'POST',
        body: JSON.stringify(data)
      }))

      const {gameOver, winner} = await winCheck.json()

      if (gameOver) {
        setWinner(winner);
      }

      setIsX(!isX);
    },
    [board, isX]
  );

  useEffect(() => {
    if (!winner) {
      return;
    }

    alert(`${winner} has won the game`);
  }, [winner]);

  return {
    board,
    handleSquareSelect,
  };
};
