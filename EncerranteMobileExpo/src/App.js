import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ParImpar from "./components/ParImpar";

export default function App() {
  return (
    <View style={styles.container}>
      <ParImpar numero={Math.floor(Math.random() * 10 - 1)} />
      <Text>texto teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    
  },
});
