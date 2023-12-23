import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function ArtistsScreen({ navigation }: {navigation: any}) {

    return (
        <Screen>
            <Text>Hello Artists Screen!</Text>
        </Screen>
    );
}

export default ArtistsScreen;