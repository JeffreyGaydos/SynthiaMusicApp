import { StyleSheet } from "react-native";


const _navigation = {
    _colorActive: "#AFAFAF",
    _colorAccent: "#5F5FFF",
    _colorDeepAccent: "blue",
    _colorBackground: "#0F0F0F"
} 

const s_navigation = StyleSheet.create({
    tab_active: {
        backgroundColor: _navigation._colorActive,
        width: 70,
        height: 4,
        position: "absolute",
        bottom: 6,
    },
    tab_inactive: {
        //deliberately blank
    },
    tab_screen: {
        backgroundColor: _navigation._colorBackground,
        borderBottomColor: _navigation._colorDeepAccent,
        borderBottomWidth: 2
    },
    tab_label: {
        position: "absolute",
        top: 13,
        fontSize: 19,
    },
    tab_bar: {
        backgroundColor: "black",
    }
});

export {
    s_navigation,
    _navigation
}