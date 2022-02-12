import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode='cover' // default
        />
      </View>
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
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150, // 300 300 150 makes perfect circle
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden', // squeeze image into borders, all over is hidden
    marginVertical: 30,
  },
  image: {
    width: '100%', // percentage of parent view which is 300  of screen
    height: '100%', // percentage of parent view which is 300 of screen
  },
});

export default GameOverScreen;
