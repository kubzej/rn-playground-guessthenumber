import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props; // getting props values, so I dont need to use props.userChoice through document

  const initialGuess = generateRandomBetween(1, 100, userChoice); // start game with number between 1 and 100 (100 automatically excluded) and exclude users choice

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]); // historical guesses

  // it survives render and keep its value
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // by default it run "after" every render cycle, but in our case it rerun whenever any prop in [] changes
  useEffect(() => {
    if (currentGuess === userChoice) {
      // if computer guesses correct number, run OnGameOver which runs GameOverHandler and it set final guess rounds
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1; // save new current low = current guess (next number cant be lower than this one)
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    ); // guess again with new lows and highs
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]); // with new Guess, t this number to list of previous guesses
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>Opponnet's guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
    justifyContent: 'space-between',
    marginTop: 20,
    width: 400,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1, // important for android so nested ScrollView is really scrollable
    width: '80%',
  },
  list: {
    alignItems: 'center', // specifically for scrollView to have each item on center
    justifyContent: 'flex-end', // start from the bottom
    flexGrow: 1, // item grows and takes much as it can, vs flex: 1 it will always show the latest guess
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default GameScreen;
