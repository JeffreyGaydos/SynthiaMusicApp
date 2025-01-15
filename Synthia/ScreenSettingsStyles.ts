import { Button, StyleSheet } from "react-native";

const settings_screen = StyleSheet.create({
    generate_database_button: {
        width: "75%",
        paddingStart: "12.5%",
        paddingVertical: 25
    },
    log_console: {
        backgroundColor: "black",
        borderBlockColor: "white",
        borderWidth: 1,
        height: "100%"
    },
    log_text: {
        color: "rgb(139, 139, 139)"
    }
})

export {
    settings_screen
}