import React from 'react';

import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  // props.children means it's just a wrapper above content I want to use that,
  // spread operator to copy styles into new object and then take all new styles from props.style
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black', // shadows props only for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5, // selects default material designs looks (only way for shadow for android)
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
});

export default Card;
