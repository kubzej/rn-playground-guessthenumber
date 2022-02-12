import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button
        title='NEW GAME'
        onPress={props.onRestart}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameOverScreen;
