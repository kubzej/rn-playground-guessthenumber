import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a new game</Text>
      <View style={styles.inputContainer}>
        <Text>Select a number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title='Reset' />
          <Button title='Confirm' />
        </View>
      </View>
    </View>
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
    shadowColor: 'black', // shadows props only for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5, // selects default material designs looks (only way for shadow for android)
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row', // so they next to each other on 1 row
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default StartGameScreen;
