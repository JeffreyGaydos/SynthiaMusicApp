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
  useEffect(() => { (async () => {
    const result = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN/cover.jpg");
    setExistsText(result);
  })() }, [])

  const [allMusic, setAllMusic] = useState<AddTrack[]>([]);
  useEffect(() => {
    (async () => {
      const dirItmes : ReadDirItem[] = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN");
      const tracks : AddTrack[] = [];
      let cover : string = "";
      dirItmes.forEach(t => {
        if(t.path.endsWith(".jpg")) {
          cover = t.path;
        } else {
          tracks.push({
            id: t.size,
            url: t.path,
            artwork: cover,
            title: t.name,
            artist: "GUNSHIP",
          });
        }
      });
      setAllMusic(tracks);
    })();    
  }, []);

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
            data={allMusic}
            renderItem={trackItemRenderer}
            keyExtractor={(item) => item.url}
          />
          </SafeAreaView>
        </View>
      </Screen>
  );
}

export default TracksScreen;