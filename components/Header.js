import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  return (
    <View
      // merge base styles with styles specific for each platform
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%', // width is through whole screen, as for main App View element the flex=1
    height: 90,
    paddingTop: 36, // because of status bar
    justifyContent: 'center', // how the child elements are positioned => Primary axis (flex direction column is default)
    alignItems: 'center', // how the child elements are positioned => Secondary axis
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  title: {
    color: Platform.OS === 'ios' ? colors.primary : 'white', // select color based on platform
  },
});

export default Header;
