import React from 'react';
import {
    Image,
  Text, View,
} from 'react-native';
import { s_playlist_item } from './styles';
import Icon from 'react-native-vector-icons/Foundation';
import routes from './routes';

interface playlist_stats {
    albums: number,
    tracks: number,
    duration: number
}

function PlaylistItem({ imageSrc, title, stats, navigation }: { imageSrc: string[], title: string, stats: playlist_stats, navigation: any}) {

    const image1 = imageSrc[Math.floor(Math.random() * imageSrc.length)];
    imageSrc = imageSrc.filter(i => i != image1);
    const image2 = imageSrc[Math.floor(Math.random() * imageSrc.length)];
    imageSrc = imageSrc.filter(i => i != image2);
    const image3 = imageSrc[Math.floor(Math.random() * imageSrc.length)];
    imageSrc = imageSrc.filter(i => i != image3);
    const image4 = imageSrc[Math.floor(Math.random() * imageSrc.length)];

    const days = Math.floor(stats.duration / 60 / 60 / 24);
    const hours = Math.floor((stats.duration - (days * 60 * 60 * 24)) / 60 / 60);
    const minutes = Math.floor((stats.duration - (days * 60 * 60 * 24) - (hours * 60 * 60)) / 60);
    const seconds = Math.floor((stats.duration - (days * 60 * 60 * 24) - (hours * 60 * 60)) - (minutes * 60));

    function GoTo_FullDetails() {
        navigation.navigate(routes.PlaylistStack.Details)
    }

    return (
        <View style={s_playlist_item.item}>
            <View style={s_playlist_item.icon_wrapper} onTouchStart={GoTo_FullDetails}>
                <Image style={s_playlist_item.icon} src={image1}></Image>
                <Image style={s_playlist_item.icon} src={image2}></Image>
                <Image style={s_playlist_item.icon} src={image3}></Image>
                <Image style={s_playlist_item.icon} src={image4}></Image>
            </View>
            <View style={s_playlist_item.details_wrapper} onTouchStart={GoTo_FullDetails}>
                <Text numberOfLines={1}>{title}</Text>
                <Text numberOfLines={1}>Albums: {stats.albums}</Text>
                <Text numberOfLines={1}>Tracks: {stats.tracks}</Text>
                <Text numberOfLines={1}>Duration: {`${days}`.padStart(2, "0")}:{`${hours}`.padStart(2, "0")}:{`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}</Text>
            </View>
            <View style={s_playlist_item.operations_wrapper}>
                <Icon 
                    style={s_playlist_item.operations_icons}
                    name="shuffle"
                    size={30}
                    onPress={() => console.log("TODO: SHUFFLE UNIMPLEMENTED")}
                />
                <Icon
                    style={s_playlist_item.operations_icons}
                    name="loop"
                    size={30}
                    onPress={() => console.log("TODO: LOOP UNIMPLEMENTED")}
                />
            </View>
        </View>
    );
}

export default PlaylistItem
export type { playlist_stats }