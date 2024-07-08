import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UploadScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload Screen</Text>
      <Button
        title="upload"
        onPress={() => {}}
      />
      <Button
        title="record"
        onPress={() => {}}
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
