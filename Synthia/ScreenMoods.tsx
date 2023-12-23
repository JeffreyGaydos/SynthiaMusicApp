import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function MoodsScreen({ navigation }: {navigation: any}) {
  function SwipeRight() {
      navigation.navigate("Tracks");
  }

  function SwipeLeft() {
      navigation.navigate("Albums");
  }    

  return (
      <Screen rightCallback={SwipeRight} leftCallback={SwipeLeft}>
          <Text>Hello Moods Screen!</Text>
      </Screen>
  );
}

export default MoodsScreen;