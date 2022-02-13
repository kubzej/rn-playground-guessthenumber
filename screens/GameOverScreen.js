import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/success.png')}
            style={styles.image}
            resizeMode='cover' // default
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed rounds{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> to guess
            the number <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>

        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2, // half of each widht and height makes perfect circle
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden', // squeeze image into borders, all over is hidden
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%', // percentage of parent view which is 300  of screen
    height: '100%', // percentage of parent view which is 300 of screen
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
  highlight: {
    color: colors.accent,
    fontFamily: 'open-sans-bold',
  },
});

export default GameOverScreen;
