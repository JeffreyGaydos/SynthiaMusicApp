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
import { _colors } from '../styles';

function TrackItem({ image, title, trackArtist, musicPath, active, setMeActive, navigation }: { image: string, title: string, trackArtist: string, musicPath: string, active: boolean, setMeActive: () => void, navigation: any}) {
    const { setPlayerTrack } = useContext(PlayerTrack);
    function PlayTrack() {
        setPlayerTrack({
            id: musicPath,
            url: musicPath,
            title: title,
            artist: trackArtist,
            artwork: image
        });
        setMeActive();
    }

    return (
        <TouchableOpacity onPress={PlayTrack} style={{...s_track_item.item, borderColor: active ? _colors._colorActive : _colors._colorAccent}}>
            <View style={{...s_track_item.icon_wrapper, borderColor: active ? _colors._colorActive : _colors._colorAccent}}>
                <Image style={s_track_item.icon} src={"file:///" + image}></Image>
            </View>
            <View style={{...s_track_item.details_wrapper}}>
                <Text numberOfLines={2}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default TrackItem