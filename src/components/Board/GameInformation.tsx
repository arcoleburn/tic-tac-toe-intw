/* eslint-disable react/no-unescaped-entities */
import type { BoardSquareValue } from "@utilities/ticTacToe";

import styles from "./GameInformation.module.css";

interface GameInformationProps {
  isGameOver: boolean;
  winner: BoardSquareValue;
  currentTurn: BoardSquareValue;
  reset: () => void;
}

const GameInformation = ({
  isGameOver,
  winner,
  currentTurn,
  reset,
}: GameInformationProps) => {
  const showGameOver = isGameOver && !winner;

  return (
    <>
      {showGameOver && <h2>Game Over</h2>}
      {winner && <h2>{winner} wins!</h2>}
      <div className={styles.informationContainer}>
        <p className={styles.turnInformation}>{currentTurn}'s turn</p>
        <button onClick={() => reset()}>Reset Game</button>
      </div>
    </>
  );
};

export default GameInformation;
