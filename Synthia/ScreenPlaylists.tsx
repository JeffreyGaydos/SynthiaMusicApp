import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';

function PlaylistsScreen({ navigation }: {navigation: any}) {
    function SwipeRight() {
        navigation.navigate("Artists");
    }

    function SwipeLeft() {
        console.log("Left swipe ignored...");
    }    

    return (
        <Screen rightCallback={SwipeRight} leftCallback={SwipeLeft}>
            <Text>Hello Playlist Screen!</Text>
        </Screen>
    );
}

export default PlaylistsScreen