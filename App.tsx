import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FindGuides from './screens/FindGuides';
import Card from './components/Pill/Card';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from './screens/Login';
import BookedScreen from './screens/BookedScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FindGuides"
          component={FindGuides}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginForm}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BookedScreen"
          component={BookedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
