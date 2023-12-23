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
        height: 4,
        color: _navigation._colorAccent
    },
    tab_inactive: {
        //deliberately blank
    },
    tab_screen: {
        backgroundColor: _navigation._colorBackground,
        borderBottomColor: _navigation._colorAccent,
        borderBottomWidth: 2
    },
    tab_label: {
        fontSize: 13,
        margin: 0
    },
    tab_bar: {
        backgroundColor: "black",
    }
});

export {
    s_navigation,
    _navigation
}