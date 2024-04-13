import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Screen from '../Screen';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import * as permissions from 'react-native-permissions'

function PlaySound() {
    Alert.alert("hello!");

    (async () => {
        await requestPermissions();
        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN/GUNSHIP - UNICORN - 03 Empress Of The Damned (feat. Lights).flac",
            title: 'Track Title',
            artist: 'Track Artist'
        });

        // Start playing it
        await TrackPlayer.play();
    })().catch(e => {
        Alert.alert("error: " + e);
    });
}

async function requestPermissions() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Synthia Music App needs permission to read your music files',
        message: 'Permission must be granted in order for Synthia to play music already on your phone',
        buttonNegative: 'deny',
        buttonPositive: 'allow'
      }
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("woot woot!");
    } else {
      console.log("aw man!");
    }
  } catch(e) {
    console.warn("uh oh: " + e);
  }
}

function PlaylistDetails({ navigation }: {navigation: any}) {
    const [downloadsFolder, setDownloadsFolder] = useState("");
    const [documentsFolder, setDocumentsFolder] = useState("");
    const [externalDirectory, setExternalDirectory] = useState("");
    const [testFileBytes, setTestFileBytes] = useState("");
    const [playState, setPlayState] = useState<boolean>(false);

    function togglePlay() {
      if(playState) {
        TrackPlayer.play();
      } else {
        TrackPlayer.pause();
      }
      const state = !playState;
      setPlayState(state);
    }

    useEffect(() => {
        setDownloadsFolder(RNFS.DownloadDirectoryPath);
        setDocumentsFolder(RNFS.DocumentDirectoryPath);
        setExternalDirectory(RNFS.ExternalStorageDirectoryPath);
    }, []);

    const [files, setFiles] : any[] = useState([]);

  const getFileContent = async (path: string) => {
    const reader = await RNFS.readDir(path);
    // const files = [];
    // reader.forEach(r => {
    //   const something = await RNFS.readFile(r.name)
    // });
    setFiles(reader);
  };
  useEffect(() => {
    getFileContent(RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN"); //run the function on the first render.
  }, []);
  //this component will render our list item to the UI
  const Item = ({ name, isFile } : {name: string, isFile: boolean}) => {
    return (
      <View>
        <Text>{name}</Text>
      </View>
    );
  };
  const renderItem = ({ item, index }: {item: {name: string, isFile: boolean}, index: number}) => {
    return (
      <View>
        <Text>{index}</Text>
        {/* The isFile method indicates whether the scanned content is a file or a folder*/}
        <Item name={item.name} isFile={false} />
      </View>
    );
  };

    return (
        <Screen>
            <View>
                <Text>Hello Playlist Details Screen!</Text>
                <Button title="Play sound" onPress={PlaySound} />
                <Text>Here's some shit:</Text>
                <Text>{downloadsFolder}</Text>
                <Text>{documentsFolder}</Text>
                <Text>{externalDirectory}</Text>
                <Text>{testFileBytes.length}</Text>
                <SafeAreaView>
                <FlatList
                    data={files}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
                </SafeAreaView>
                <Text>{RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN/GUNSHIP - UNICORN - 03 Empress Of The Damned (feat. Lights).flac"}</Text>
                <Button title="Pause/Play" onPress={togglePlay}></Button>
                <Button title="Reset??" onPress={() => TrackPlayer.reset()}></Button>
            </View>
        </Screen>
    );
}

export default PlaylistDetails;