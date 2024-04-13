import { DimensionValue, StyleSheet } from "react-native";
import { _colors } from "../styles";
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const s_player = StyleSheet.create({
    container: {
        width: '100%' as DimensionValue,
        height: 50,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopColor: _colors._colorDeepAccent,
        borderTopWidth: 2
    },

    progress: {
        backgroundColor: _colors._colorAccent,
        height: 2,
        width: '0%' as DimensionValue,
    },

    controls: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },

    spacer: {
        flexDirection: 'row',
        flex: 1
    },

    cover: {
        height: '100%' as DimensionValue,
        width: '100%' as DimensionValue,
        position: "absolute"
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
        fontSize: 30,
        paddingVertical: 10,
        flex: 1,
        color: _colors._colorAccent,
        textAlign: 'center'
    },

    playpause: {
    },

    next: {
    },

    previous: {
    }
});

export {
    s_player
}