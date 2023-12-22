import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function ArtistsScreen({ navigation }: {navigation: any}) {
    function SwipeRight() {
        navigation.navigate("Albums");
    }

    function SwipeLeft() {
        navigation.navigate("Playlists");
    }    

    return (
        <Screen rightCallback={SwipeRight} leftCallback={SwipeLeft}>
            <Text>Hello Artists Screen!</Text>
        </Screen>
    );
}

export default ArtistsScreen;