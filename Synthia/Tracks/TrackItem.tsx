import React, { useContext } from 'react';
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
import { PlayerTrack } from '../MainTabs';

function TrackItem({ image, title, musicPath, navigation }: { image: string, title: string, musicPath: string, navigation: any}) {
    const { setPlayerTrack } = useContext(PlayerTrack);
    function PlayTrack() {
        setPlayerTrack({
            id: musicPath,
            url: musicPath,
            title: title,
            artist: "GUNSHIP",
            artwork: image
        });
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