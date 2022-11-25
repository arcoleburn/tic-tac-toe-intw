import { TicTacToeBoard, Player, BoardSquareValue } from "@utilities/ticTacToe";

import { useCallback, useEffect, useState } from "react";



import { isGameOver, isWinner } from "@utilities/ticTacToe";
import { useScore } from "../Score";

const createNewTicTacToeBoard = () => Array(9).fill(null);


const  fetchWinCheck = async (url: string, data: any) => {
  const response = await fetch(url, data)
  const finalData = await response.json()
  console.log('finalData', finalData)
  return finalData
}



export const useTicTacToe = () => {
  const { addWinO, addWinX } = useScore();
  const [board, setBoard] = useState<TicTacToeBoard>(createNewTicTacToeBoard);
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<BoardSquareValue>(null);

  const currentTurn: BoardSquareValue = isX ? "X" : "O";

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
// const winCheck = await fetchWinCheck('http://localhost:3000/api/wincheck', {method: 'POST', body: JSON.stringify(data)})
// console.log(winCheck)
      // const winCheck = await (fetch('https://tic-tac-toe-intw.vercel.app/api/wincheck',{
      //   method:'POST',
      //   mode: "no-cors", 
      //   body: JSON.stringify(data)
      // }))

      const winCheck = await fetchWinCheck('https://tic-tac-toe-intw.vercel.app/api/wincheck', {method: 'POST', body:JSON.stringify(data)})

      // const winCheck = await (fetch('localhost:3000/api/wincheck',{
      //   method:'POST',
      //   mode: "no-cors", 
      //   body: JSON.stringify(data)
      // }))


      // console.log({winCheck})
      // const res = await winCheck.json()
      

      if (winCheck.gameOver) {
        setWinner(winCheck.winner);
      }
console.log('set isX from', isX, 'to', !isX)
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
