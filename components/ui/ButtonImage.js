import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function ButtonImage(props) {
  const {href, onPress, children } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      { href && 
      <Link href={href}  className='w-full'>
        {children}
      </Link>
      }
      { !href  && children }      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: '100%'
  }
});