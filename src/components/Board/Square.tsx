import type { BoardSquareValue } from "@utilities/ticTacToe";

import styles from "./Square.module.css";

interface BoardSquareProps {
  onSquareSelect: () => void;
  value: BoardSquareValue;
}

const Square = ({ onSquareSelect, value }: BoardSquareProps) => {
  return (
    <div className={styles.square} onClick={() => onSquareSelect()}>
      {value}
    </div>
  );
};

export default Square;
