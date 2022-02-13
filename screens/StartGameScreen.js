import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState(''); // value I am entering, is inside text input
  const [confirmed, setConfirmed] = useState(false); // state to know if the enteredValue is confirmed
  const [selectedNumber, setSelectedNumber] = useState(); // number after confirming enteredNumber, number I really want to work with
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  ); // button width to work with orientation

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, '')); // replace non number string with empty string and set it as enteredValue
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  // to calculate button width anytime I change orientation
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout); // just do cleanup
    };
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    // validation of chosenNumber, if number is not validate, dont run setConfirmed....
    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99', [
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
        <BodyText>Your selected number:</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => props.onStartGame(selectedNumber)} // after click save to props OnStartGame selected Number
        >
          START GAME
        </MainButton>
      </Card>
    ); // if number is confirmed, add new element containing NumberContainer and Button Start Game and put it to return() as {confirmedOutput}
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Write a number:</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit // official props which I am forwarding to TextInput component in my own Input.js
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler} // when changing text run validation
                value={enteredValue} // set value as enteredValue which is taken from numberInputHandler
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='RESET'
                    color={colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='CONFIRM'
                    color={colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    width: '80%',
    minWidth: 300, // give it min 300 pixels, but with width we are sure that on small devices, it will take max 80% of width
    alignItems: 'center', // align items to center on x axis
    maxWidth: '95%', // wee are sure it will never go outside of screen
  },
  buttonContainer: {
    flexDirection: 'row', // so they next to each other on 1 row
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: '45%',
  //   width: Dimensions.get('window').width / 3, // almost same as percentage, window here mean on Android it's without top bar
  // },
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
