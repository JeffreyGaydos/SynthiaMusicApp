import { DimensionValue, StyleSheet } from "react-native";
import { _colors } from "../styles";

const _playlist_item = {
    grid_padding: 10,
    icon_size: 40
}

const s_track_item = StyleSheet.create({
    icon: {
        width: _playlist_item.icon_size,
        height: _playlist_item.icon_size,
        backgroundColor: _colors._colorAccent
    },
    icon_wrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
        display: "flex",
        flex: 1,
        width: _playlist_item.icon_size + 5,
        borderRightWidth: 5,
        borderRightColor: _colors._colorAccent
    },
    grid: {
        padding: _playlist_item.grid_padding
    },
    item: {
        width: `calc(100% - ${_playlist_item.grid_padding * 2}px)` as DimensionValue,
        height: _playlist_item.icon_size + 5,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "black",
        borderBottomWidth: 5,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 5,
        borderBottomColor: _colors._colorAccent,
    },
    operations_wrapper: {
        position: "absolute",
        right: 0,
        marginBottom: 0,
    },
    operations_icons: {
        fontSize: _playlist_item.icon_size - 12,
        paddingTop: 5,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        color: _colors._colorActive
    },
    details_wrapper: {
        position: "absolute",
        left: _playlist_item.icon_size + 10,
        width: 340,
    },
    title: {
        width: 2 * _playlist_item.icon_size,
        position: "absolute",
        bottom: 0,
        backgroundColor: _colors._colorAccent,
        marginBottom: -5
    }
});

export {
    s_track_item
}