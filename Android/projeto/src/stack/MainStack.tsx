import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import home from '../screens/home'

const Stack = createNativeStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="home" component={home} />
    </Stack.Navigator>
)