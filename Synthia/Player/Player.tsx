import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import TrackPlayer, { AddTrack, Track } from 'react-native-track-player';
import { s_player } from './Player'
import Icon from 'react-native-vector-icons/Foundation';

function Player({addTrack} : {addTrack: AddTrack | undefined}) {
    const [playState, setPlayState] = useState<boolean>(false);
    const [onLoad, setOnLoad] = useState<boolean>(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    function beginCoverFade() {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        beginCoverFade();
    }, [fadeAnim]);

    useEffect(() => {
        fadeAnim.setValue(0);
        if(addTrack?.artwork) {
            beginCoverFade();
        }
    }, [addTrack?.artwork]);

    function playpause(play: boolean | undefined = undefined) {
        setPlayState(play === undefined ? !playState : play);
    }

    function PlayPausePress() {
        playpause();
    }

    useEffect(() => {
        (async () => {
            if(addTrack) {
                console.log(onLoad);
                if(playState && onLoad) {
                    console.log("attempting play");
                    await TrackPlayer.play();
                } else {
                    console.log("attempting pause");
                    await TrackPlayer.pause();
                }
            } else {
                if(playState) {
                    console.error("Could not play. No selected track");
                }
            }
        })();
    }, [playState]);

    useEffect(() => {
        (async () => {
            if(addTrack) {
                await TrackPlayer.reset();
                await TrackPlayer.add(addTrack);
                console.log(addTrack);
                if(onLoad) {
                    setPlayState(false);
                } else {
                    console.log("stopped onload play");
                    //don't play on app load up
                    setOnLoad(true);
                }
                playpause(true);
            }
        })();
    }, [addTrack]);

    function next() {

    }

    function previous() {

    }

    return (
        <>
            {addTrack && <>
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
                                name={playState ? "pause" : "play"}
                                size={30}
                                onPress={PlayPausePress}
                        />
                        <Icon 
                            style={{...s_player.next, ...s_player.controlWidget}}
                            name="next"
                            size={30}
                            onPress={() => console.log("TODO: NEXT UNIMPLEMENTED")}
                        />
                    </View>
                    <View style={s_player.coverWindow}>
                        <Animated.Image
                            style={{
                                ...s_player.cover,
                                opacity: fadeAnim
                            }}
                            src={"file:///" + addTrack.artwork}
                            />
                    </View>
                    <View style={s_player.spacer}></View>
                </View>
            </>}
        </>
    );
}

export default Player;