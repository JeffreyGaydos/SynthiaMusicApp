import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NotificationFooter from './components/NotificationFooter';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={app.text}>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={app.text}>Details Screen</Text>
    </View>
  );
}

function App(): React.JSX.Element {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
      <NotificationFooter />
    </NavigationContainer>
  );
}

const app = StyleSheet.create({
  text: {
    color: 'black'
  }
});

export default App;