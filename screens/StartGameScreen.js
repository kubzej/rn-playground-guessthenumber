import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState(''); // value I am entering, is inside text input
  const [confirmed, setConfirmed] = useState(false); // state to know if the enteredValue is confirmed
  const [selectedNumber, setSelectedNumber] = useState(); // number after confirming enteredNumber, number I really want to work with

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, '')); // replace non number string with empty string and set it as enteredValue
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    // validation of chosenNumber, if number is not validate, dont run setConfirmed....
    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]); // show native alert, after pressing on Okay button, reset input
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title='START GAME' />
      </Card>
    ); // if number is confirmed, add new element containing NumberContainer and Button Start Game and put it to return() as {confirmedOutput}
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number:</Text>
          <Input
            style={styles.input}
            blurOnSubmit // official props which I am forwarding to TextInput component in my own Input.js
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler} // when changing text run validation
            value={enteredValue} // set value as enteredValue which is taken from numberInputHandler
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title='Reset'
                color={colors.accent}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title='Confirm'
                color={colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center', // move content to the center of x axis (seconday axis when primary is column)
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300, // give it 300 pixels, but with maxWidth we are sure that on small devices, it will take max 80% of width
    maxWidth: '80%',
    alignItems: 'center', // align items to center on x axis
  },
  buttonContainer: {
    flexDirection: 'row', // so they next to each other on 1 row
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: '45%',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
