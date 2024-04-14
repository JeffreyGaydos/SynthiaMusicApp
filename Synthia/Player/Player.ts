import { DimensionValue, StyleSheet } from "react-native";
import { _colors } from "../styles";
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const playerHeight = 50;
const progressHeight = 4;
const progressBorderHeight = 2;
const progressColor1 = _colors._colorAccent;
const progressColor2 = _colors._colorDeepAccent;

const s_player = StyleSheet.create({
    container: {
        width: '100%' as DimensionValue,
        height: playerHeight,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        // borderTopColor: _colors._colorDeepAccent,
        // borderTopWidth: 4
    },

    progress: {
        backgroundColor: progressColor1,
        position: "absolute",
        height: progressHeight + progressBorderHeight,
        width: '100%' as DimensionValue,
        bottom: playerHeight - progressHeight - progressBorderHeight,
        borderColor: progressColor2,
        borderBottomWidth: progressBorderHeight
    },

    progress_underline: {
        position: "absolute",
        height: progressHeight + progressBorderHeight,
        width: '100%' as DimensionValue,
        bottom: playerHeight - progressHeight - progressBorderHeight,
        borderColor: progressColor2,
        opacity: 0.5,
        borderBottomWidth: progressBorderHeight,
    },

    controls: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'center'
    },

    spacer: {
        flexDirection: 'row',
        flex: 1
    },

    cover: {
        height: '100%' as DimensionValue,
        width: '100%' as DimensionValue,
        position: "absolute",
    },

    coverWindow: {
        opacity: 0.25,
        backgroundColor: "black",
        height: '100%' as DimensionValue,
        width: '100%' as DimensionValue,
        position: "absolute",
        zIndex: -1
    },

    controlWidget: {
        height: '100%' as DimensionValue,
        width: '100%' as DimensionValue,
        paddingVertical: 9,
        flex: 1,
        color: _colors._colorAccent,
        textAlign: 'center',
    },

    fadableControlWidget: {
        height: '100%' as DimensionValue,
        width: '100%' as DimensionValue,
        flex: 1,
        color: _colors._colorAccent,
        textAlign: 'center',
    },

    playpause: {
    },

    next: {
    },

    previous: {
    },

    shuffle: {
    },

    repeat: {
    },

    inactiveControlWidget: {
        opacity: 0.5
        // color: _colors._colorBackground,
        // textShadowColor: "white",
        // textShadowRadius: 10
    }
});

export {
    s_player
}