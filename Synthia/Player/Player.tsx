import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TrackPlayer, { AddTrack } from 'react-native-track-player';
import { s_player } from './Player'
import Icon from 'react-native-vector-icons/Foundation';

function Player(addTrack: AddTrack) {
    function playpause() {

    }

    function next() {

    }

    function previous() {

    }

    return (
        <>
            <View style={s_player.progress}></View>
            <View style={s_player.container}>
                <View style={s_player.spacer}></View>
                <View style={s_player.controls}>
                    <Icon 
                        style={{...s_player.previous, ...s_player.controlWidget}}
                        name="previous"
                        size={30}
                        onPress={() => console.log("TODO: PREVIOUS UNIMPLEMENTED")}
                    />
                    <Icon 
                            style={{...s_player.playpause, ...s_player.controlWidget}}
                            name="play"
                            size={30}
                            onPress={() => console.log("TODO: PLAY UNIMPLEMENTED")}
                    />
                    <Icon 
                        style={{...s_player.next, ...s_player.controlWidget}}
                        name="next"
                        size={30}
                        onPress={() => console.log("TODO: NEXT UNIMPLEMENTED")}
                    />
                </View>
                <View style={s_player.spacer}></View>
            </View>
        </>
    );
}

export default Player;