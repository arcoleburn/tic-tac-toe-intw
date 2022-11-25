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
console.log('handle square select')
      const newBoard = [...board];
      newBoard[selectedSquare] = currentTurn;
      setBoard(newBoard);

      const data = {
        board: newBoard,
        player: currentTurn
      }
      const winCheck = await (fetch('https://tic-tac-toe-intw.vercel.app/api/wincheck',{
        method:'POST',
        mode: "no-cors", 
        body: JSON.stringify(data)
      }))
      console.log({winCheck})
      const res = await winCheck.json()
      const {gameOver, winner} = res

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
