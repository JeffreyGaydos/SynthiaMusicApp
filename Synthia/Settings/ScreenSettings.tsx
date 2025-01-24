import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { Screen } from 'react-native-screens';
import { settings_screen } from './ScreenSettingsStyles';
import { _colors } from '../styles';
import { useMusicLibrary } from '../Backend/MusicLibraryProvider';
import { getAll, SortSongFields } from "react-native-get-music-files"
import { Song } from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';

export type LogLevel = "Information" | "Warning" | "Error"; //typed primarily for unit testing
export interface DatabaseLogger {
  pushLog(message: string, level: LogLevel): void
};

function ScreenSettings(/* Parameters */) {  
    const db = useMusicLibrary();

    const [dbgLogs, setDbgLogs] = useState<{message: string, timestamp: string, level: "Information" | "Warning" | "Error" }[]>([]);
      useEffect(() => {
        (async() => {
          setDbgLogs([
          ]);
        })();
        // pushLog("Information", "Information");
        // pushLog("Warning", "Warning");
        // pushLog("Error", "Error");
      }, []);

    // NOTE: parameter name "item" is required
    const dbgLogRender = ({item} : {item: {message: string, level: "Information" | "Warning" | "Error" }}) => {
        var log_style;
        switch(item.level) {
          case 'Information':
            log_style = settings_screen.log_text
            break;
          case 'Warning':
            log_style = settings_screen.warning_text
            break;
            case 'Error':
              log_style = settings_screen.error_text
              break;
        }
        return (
          <View>
            <Text style={log_style}>{item.message}</Text>
          </View>
        );
    };

    function pushLog(logMessage: string, level: "Information" | "Warning" | "Error") {
        setDbgLogs(ps =>
          [
            {
              message: `[${new Date(Date.now()).toLocaleString()}]: ${logMessage}`,
              timestamp: Date.now().toString(),
              level: level
            },
            ...ps
          ]);
    }

    async function generateDatabase() {
      pushLog("Generating Database...", "Information");
      (async () => {
        var all : string | Song[] = [];
        var offset = 0;
        var bactchSize = 1;
        var totalCountLimit = Number.MAX_VALUE;
        do {
          all = await getAll({
            limit: bactchSize,
            offset: offset,
            coverQuality: 100,
            sortBy: SortSongFields.TITLE
          });

          if(typeof all === 'string') {
            pushLog("ERROR: " + all, "Error");
          } else {
            for(var i = 0; i < all.length; i++) {
              try {
                await db.generateDatabase(all[i], { pushLog }, all.length);
              }
              catch(e: unknown) {
                pushLog(`ERROR: ${(e as { message: string}).message}`, "Error");
              }
            }
          }
          offset += bactchSize;
        } while(typeof all !== 'string' && all.length > 0 && offset < totalCountLimit);          
      })();
    }

    function refreshSchema() {
      db.refreshSchema();
    }    

    return (
        <Screen>
          <View>
            <Text>Settings</Text>
            <View style={settings_screen.generate_database_button}>
              <Button title="Reset Database" onPress={refreshSchema} color={_colors._colorAccent}></Button>
            </View>
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
          </View>
        </Screen>
    );
}

export default ScreenSettings;