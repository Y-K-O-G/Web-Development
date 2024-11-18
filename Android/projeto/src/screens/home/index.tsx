// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './styles';

export default () => {

}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

