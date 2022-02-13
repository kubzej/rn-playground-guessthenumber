import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%', // width is through whole screen, as for main App View element the flex=1
    height: 90,
    paddingTop: 36, // because of status bar
    backgroundColor: Platform.OS === 'android' ? colors.primary : 'white', // select color based on platform
    justifyContent: 'center', // how the child elements are positioned => Primary axis (flex direction column is default)
    alignItems: 'center', // how the child elements are positioned => Secondary axis
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
  },
  title: {
    color: Platform.OS === 'ios' ? colors.primary : 'white',
  },
});

export default Header;
