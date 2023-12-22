import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function AlbumsScreen({ navigation }: {navigation: any}) {
  function SwipeRight() {
      navigation.navigate("Moods");
  }

  function SwipeLeft() {
      navigation.navigate("Artists");
  }    

  return (
      <Screen rightCallback={SwipeRight} leftCallback={SwipeLeft}>
          <Text>Hello Albums Screen!</Text>
      </Screen>
  );
}

export default AlbumsScreen;