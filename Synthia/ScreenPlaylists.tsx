import React from 'react';
import {
  Text,
} from 'react-native';
import Screen from './Screen';
import Playlists from './Playlists';

function PlaylistsScreen({ navigation }: {navigation: any}) {
    function SwipeRight() {
        navigation.navigate("Artists");
    }

    function SwipeLeft() {
        console.log("Left swipe ignored...");
    }    

    return (
        <Screen rightCallback={SwipeRight} leftCallback={SwipeLeft}>
            <Playlists navigation={navigation}></Playlists>
        </Screen>
    );
}

export default PlaylistsScreen