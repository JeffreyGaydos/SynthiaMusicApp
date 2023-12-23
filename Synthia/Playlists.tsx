import React from 'react';
import {
  Text, View,
} from 'react-native';
import 'react-native-gesture-handler';
import PlaylistItem from './PlaylistItem';
import { s_playlist_item } from './styles';

function Playlists({ navigation }: {navigation: any}) {

    return (
        <View style={s_playlist_item.grid}>
          <PlaylistItem
            imageSrc={["https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain1.jpg", "https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain2.jpg", "https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain3.jpg", "https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain4.jpg"]}
            title="Playlist 1 title is really long omg why did you do this please stop trying to break my stuff thank you!"
            stats={{
              albums: 4,
              duration: 1981,
              tracks: 35
            }}
            navigation={navigation}
          />
          <PlaylistItem
            imageSrc={["https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain4.jpg", "https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain5.jpg", "https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain6.jpg", "https://raw.githubusercontent.com/JeffreyGaydos/SynthiaFrontend/playlist-item/Synthia/_data/Mountain7.jpg"]}
            title="General Shuffle Teir 3"
            stats={{
              albums: 284,
              duration: 1924680,
              tracks: 18267
            }}
            navigation={navigation}
          />
        </View>
    );
}

export default Playlists