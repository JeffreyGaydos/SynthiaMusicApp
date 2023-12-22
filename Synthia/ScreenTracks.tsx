import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function TracksScreen({ navigation }: {navigation: any}) {
  function SwipeRight() {
      console.log("Swipe Right ignored...");
  }

  function SwipeLeft() {
      navigation.navigate("Moods");
  }    

  return (
      <Screen rightCallback={SwipeRight} leftCallback={SwipeLeft}>
          <Text>Hello Artists Screen!</Text>
      </Screen>
  );
}

export default TracksScreen;