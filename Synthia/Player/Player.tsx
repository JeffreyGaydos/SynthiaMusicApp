import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Animated, DimensionValue } from 'react-native';
import TrackPlayer, { AddTrack, Track } from 'react-native-track-player';
import { s_player } from './Player'
import Icon from 'react-native-vector-icons/Foundation';

const progressRefreshRateMsec = 250;

function Player({addTrack} : {addTrack: AddTrack | undefined}) {
    const [playState, setPlayState] = useState<boolean>(false);
    const [trackProgress, setTrackProgress] = useState<number>(0);
    const [needProgressUpdate, setNeedProgressUpdate] = useState<boolean>(true);

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
        if(addTrack?.artwork !== "Not found") {
            beginCoverFade();
        }
    }, [addTrack?.artwork]);

    function playpause(play: boolean | undefined = undefined) {
        setNeedProgressUpdate(!needProgressUpdate);
        setPlayState(play === undefined ? !playState : play);
    }

    function PlayPausePress() {
        playpause();
    }

    useEffect(() => {
        (async () => {
            if(addTrack) {
                if(playState) {
                    await TrackPlayer.play();
                } else {
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
                setPlayState(false);
                playpause(true);
            }
        })();
    }, [addTrack]);

    useEffect(() => {
        (async () => {
            if(addTrack) {
                const getProgress = await TrackPlayer.getProgress();
                setTrackProgress(getProgress.position / getProgress.duration);
            }
        })();
    }, [needProgressUpdate]);

    // this stuff is just so we can get a consistent timer that doesn't overquery if we start having trouble rendering
    useEffect(() => {
        setTimeout(() => {
            setNeedProgressUpdate(!needProgressUpdate);
        }, progressRefreshRateMsec);
    }, [trackProgress]);

    useEffect(() => {
        setNeedProgressUpdate(!needProgressUpdate);
    }, []);

    return (
        <>
            {addTrack && <>
                <View style={{
                    ...s_player.progress,
                    width: `${trackProgress * 100}%` as DimensionValue
                    }}></View>
                <View style={s_player.container}>
                    <View style={s_player.spacer}></View>
                    <View style={s_player.controls}>
                        <Icon 
                            style={{...s_player.previous, ...s_player.controlWidget}}
                            name="previous"
                            size={30}
                            onPress={() => {
                                console.log("TODO: PREVIOUS UNIMPLEMENTED");
                            }}
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