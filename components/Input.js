import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
  // {...props} it takes all the props I have and add them to my component as props
  // or differently I am forwarding my props to the component I am using in my custom component
  // if if take style prop from outside, it is overwritten by style set here in style={{ ...styles.input, ...props.style }}
};

const styles = StyleSheet.create({
  // general styles for input component
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
