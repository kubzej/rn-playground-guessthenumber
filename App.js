import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0); // how many rounds computer needed to guess the correct number

  // run when clicking on New Game button within Game Over screen
  const configureNewGameHandler = () => {
    // reset guesses
    setGuessRounds(0);
    // reset user number
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    // gets the selectedNumber as input and setUserNumber to be that selected number here
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    // once computer guesses correct number, set final round number
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  // if number is selected already, show GameScreen
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    // when we set guessRounds, we can show GameOverScreen
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={'GUESS THE NUMBER'} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // it will occupy whole screen
  },
});
