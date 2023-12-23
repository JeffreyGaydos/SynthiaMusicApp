import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function AlbumsScreen({ navigation }: {navigation: any}) {

  return (
      <Screen>
          <Text>Hello Albums Screen!</Text>
      </Screen>
  );
}

export default AlbumsScreen;