import { useScore } from "./scoreContext";

import styles from "./Score.module.css";
interface DisplayProps {
  label: string;
  wins: number;
}

const Display = ({ label, wins }: DisplayProps) => {
  return (
    <div className={styles.score}>
      <p className={styles.scoreText}>{wins}</p>
      <p className={styles.scoreLabel}>{label}</p>
    </div>
  );
};

const Score = () => {
  const { xWins, oWins } = useScore();

  return (
    <div className={styles.scoreContainer}>
      <h2>Score</h2>
      <div className={styles.scoreRow}>
        <Display label="X Wins" wins={xWins} />
        <div className={styles.scoreDivider} />
        <Display label="O Wins" wins={oWins} />
      </div>
    </div>
  );
};

export default Score;
