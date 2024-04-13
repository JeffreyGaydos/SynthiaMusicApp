import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView
} from 'react-native';
import Screen from '../Screen';
import TrackItem from './TrackItem';
import RNFS, { ReadDirItem } from 'react-native-fs';
import { AddTrack } from 'react-native-track-player';

function TracksScreen({ navigation }: {navigation: any}) {
  const [existsTest, setExistsText] = useState<Boolean>(false);
  const [hundredsOfTracks, setHundredsOfTracks] = useState<number>(0);
  useEffect(() => { (async () => {
    const result = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN/cover.jpg");
    setExistsText(result);
  })() }, [])

  const [allMusic, setAllMusic] = useState<AddTrack[]>([]);
  const [renderedAllMusic, setRenderedAllMusic] = useState<AddTrack[]>([]);
  useEffect(() => {
    (async() => {
      let allMusic: AddTrack[] = [];
      //const artistDirs : ReadDirItem[] = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Music");
      const artistDirs = [{
        isDirectory: () => true,
        name: "GUNSHIP"
      },
      {
        isDirectory: () => true,
        name: "Solar Fields"
      },
      {
        isDirectory: () => true,
        name: "Washed Out"
      }];
      console.log(artistDirs[0]);
      for(let j = 0; j < artistDirs.length; j++) {
        if(artistDirs[j].isDirectory()) {
          const artistName = artistDirs[j].name;
          console.log("Looking at: " + RNFS.ExternalStorageDirectoryPath + "/Music/" + artistName);
          const albumDirs : ReadDirItem[] = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Music/" + artistName);
          for(let i = 0; i < albumDirs.length; i++) {
            if(albumDirs[i].isFile()) {
              continue;
            }
            console.log("GS0: " + allMusic.length);
            console.log("Looking at 2: " + RNFS.ExternalStorageDirectoryPath + "/Music/" + artistName + "/" + albumDirs[i].name);
            const dirItmes : ReadDirItem[] = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Music/" + artistName + "/" + albumDirs[i].name);
            const tracks : AddTrack[] = [];
            let cover : string = "Not found";
            const coverFiles = dirItmes.filter(d => d.path.endsWith(".jpg") || d.path.endsWith(".png"));
            if(coverFiles.length > 0) {
              cover = coverFiles[0].path;
            }
            dirItmes.forEach(t => {
              if(!t.path.endsWith(".jpg") && !t.path.endsWith(".png")) {
                tracks.push({
                  id: t.size,
                  url: t.path,
                  artwork: cover,
                  title: t.name,
                  artist: artistName,
                });
              }
            });
            console.log("Tracks:" + tracks.length);
            allMusic = allMusic.concat(tracks);
            console.log("GS1: " + allMusic.length);
          }
          console.log("GS2: " + allMusic.length);
          setAllMusic(allMusic);
        }
      }
      setRenderedAllMusic(allMusic);
      // const musicDirs = ["UNICORN", "GUNSHIP", "Dark All Day"];
      // for(let i = 0; i < musicDirs.length; i++) {
      //   console.log("GS0: " + allMusic.length)
      //   const dirItmes : ReadDirItem[] = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/" + gunshipDirs[i]);
      //   const tracks : AddTrack[] = [];
      //   let cover : string = "";
      //   dirItmes.forEach(t => {
      //     if(t.path.endsWith(".jpg")) {
      //       cover = t.path;
      //     } else {
      //       tracks.push({
      //         id: t.size,
      //         url: t.path,
      //         artwork: cover,
      //         title: t.name,
      //         artist: "GUNSHIP",
      //       });
      //     }
      //   });
      //   console.log("Tracks:" + tracks.length);
      //   allMusic = allMusic.concat(tracks);
      //   console.log("GS1: " + allMusic.length);
      // }
      // console.log("GS2: " + allMusic.length);
      // setAllMusic(allMusic);
    })();
  }, []);

  useEffect(() => {
    if(allMusic.length / 100 !== hundredsOfTracks) {
      setHundredsOfTracks(allMusic.length / 100);
    }
  }, [allMusic]);

  useEffect(() => {
    setRenderedAllMusic(allMusic);
  }, [hundredsOfTracks]);

  const trackItemRenderer = ({item} : {item: AddTrack}) => {
    return (
      <View>
        <TrackItem
          image={item.artwork ?? ""}
          navigation={navigation}
          title={item.title ?? "Unknown Title"}
          musicPath={item.url}
          key={item.url}/>
      </View>
    );
  }

  return (
      <Screen>
        <View>
          <SafeAreaView>
          <FlatList
            data={renderedAllMusic}
            renderItem={trackItemRenderer}
            keyExtractor={(item) => item.url}
          />
          </SafeAreaView>
        </View>
      </Screen>
  );
}

export default TracksScreen;