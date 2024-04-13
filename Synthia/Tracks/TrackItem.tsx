import React from 'react';
import {
    Button,
    Image,
    TouchableOpacity,
  Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import routes from '../routes';
import { s_track_item } from './TrackItemStyles';
import TrackPlayer from 'react-native-track-player';

function TrackItem({ image, title, musicPath, navigation }: { image: string, title: string, musicPath: string, navigation: any}) {
    function PlayTrack() {
        (async () => {
            await TrackPlayer.reset();

            await TrackPlayer.add({
                id: musicPath,
                url: musicPath,
                title: title,
                artist: "GUNSHIP",
                artwork: image
            });

            await TrackPlayer.play();
        })();
    }

    return (
        <TouchableOpacity onPress={PlayTrack} style={s_track_item.item}>
            <View style={s_track_item.icon_wrapper}>
                <Image style={s_track_item.icon} src={"file:///" + image}></Image>
            </View>
            <View style={s_track_item.details_wrapper}>
                <Text numberOfLines={2}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default TrackItem