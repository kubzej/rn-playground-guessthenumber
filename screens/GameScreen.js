import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); // recursive function when computer guess the excluded number
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props; // getting props values, so I dont need to use props.userChoice through document

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice) // start game with number between 1 and 100 (100 automatically excluded) and exclude users choice
  );
  const [rounds, setRounds] = useState(0); // number of rounds of guesses

  // it survives render and keep its value
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // by default it run "after" every render cycle, but in our case it rerun whenever any prop in [] changes
  useEffect(() => {
    if (currentGuess === userChoice) {
      // if computer guesses correct number, run OnGameOver which runs GameOverHandler and it set final guess rounds
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    // validation that I am not giving bad advices lower/greater
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      // if I gave bad advice, open Alert
      Alert.alert('Do not lie', 'You know this advice is wrong', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess; // save new current high = current guess (next number cant be higher than this one)
    } else {
      currentLow.current = currentGuess; // save new current low = current guess (next number cant be lower than this one)
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    ); // guess again with new lows and highs
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1); // raise rounds calculation + 1
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>Opponnet's guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title='LOWER'
          onPress={nextGuessHandler.bind(this, 'lower')}
          color={colors.primary}
        />
        <Button
          title='GREATER'
          onPress={nextGuessHandler.bind(this, 'greater')}
          color={colors.primary}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
