import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>User Screen</Text>
      <Text>User details</Text>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
