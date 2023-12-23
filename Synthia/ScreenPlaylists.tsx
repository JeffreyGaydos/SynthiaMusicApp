import React from 'react';
import Screen from './Screen';
import Playlists from './Playlists';

function PlaylistsScreen({ navigation }: {navigation: any}) {

    return (
        <Screen>
            <Playlists navigation={navigation}></Playlists>
        </Screen>
    );
}

export default PlaylistsScreen