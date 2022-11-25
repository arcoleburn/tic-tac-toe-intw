import Board from "./components/Board";
import Score, { ScoreContextProvider } from "./components/Score";

import styles from "./App.module.css";

function App() {
  return (
    <ScoreContextProvider>
      <h1 className={styles.appHeader}>Tic Tac Toe</h1>
      <div className={styles.app}>
        <Board />
        <Score />
      </div>
    </ScoreContextProvider>
  );
}

export default App;
