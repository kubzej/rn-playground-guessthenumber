import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import colors from '../constants/colors';

const MainButton = (props) => {
  let ButtonCompoment = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonCompoment = TouchableNativeFeedback;
  } // if android we want button with ripple effect

  return (
    <View style={styles.buttonContainer}>
      <ButtonCompoment activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonCompoment>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25, // so the ripple effect on android is with same border as button
    overflow: 'hidden',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default MainButton;
