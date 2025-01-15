import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Screen } from 'react-native-screens';
import { settings_screen } from './ScreenSettingsStyles';
import { _colors } from './styles';
import { useMusicLibrary } from './Backend/MusicLibraryProvider';

function ScreenSettings(/* Parameters */) {  
    const db = useMusicLibrary();

    const [dbgLogs, setDbgLogs] = useState<{message: string, timestamp: string}[]>([]);
      useEffect(() => {
        (async() => {
          setDbgLogs([
          ]);
        })();
      }, []);

    // NOTE: parameter name "item" is required
    const dbgLogRender = ({item} : {item: {message: string}}) => {
        return (
          <View>
            <Text style={settings_screen.log_text}>{item.message}</Text>
          </View>
        );
    };

    function pushLog(logMessage: string) {
        setDbgLogs(ps => [{ message: `[${new Date(Date.now()).toLocaleString()}]: ${logMessage}`, timestamp: Date.now().toString()}, ...ps]);
    }

    function generateDatabase() {
        pushLog("Log!");
        db.generateDatabase();
    }

    return (
        <Screen>
            <Text>Settings</Text>
            <View style={settings_screen.generate_database_button}>
                <Button title="Generate Database" onPress={generateDatabase} color={_colors._colorAccent}></Button>
            </View>
            <View style={settings_screen.log_console} >
                <FlatList
                    data={dbgLogs}
                    renderItem={dbgLogRender}
                    keyExtractor={(log) => log.timestamp}
                    />
            </View>
        </Screen>
    );
}

export default ScreenSettings;