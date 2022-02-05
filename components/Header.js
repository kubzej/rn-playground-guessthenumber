import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%', // width is through whole screen, as for main App View element the flex=1
    height: 90,
    paddingTop: 36, // because of status bar
    backgroundColor: '#7FE58A',
    justifyContent: 'center', // how the child elements are positioned => Primary axis (flex direction column is default)
    alignItems: 'center', // how the child elements are positioned => Secondary axis
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
  },
});

export default Header;
