import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  SafeAreaView
} from 'react-native';
import Screen from '../Screen';
import TrackItem from './TrackItem';
import { AddTrack } from 'react-native-track-player';
import { useMusicLibrary } from '../MusicLibraryProvider';

function TracksScreen({ navigation }: {navigation: any}) {
  const [activeTrack, setActiveTrack] = useState<string>();
  const db = useMusicLibrary();

  const [renderedAllMusic, setRenderedAllMusic] = useState<AddTrack[]>([]);
  useEffect(() => {
    (async() => {
      const tracks = await db.getTracks(undefined, "title ASC");
      setRenderedAllMusic(tracks);
    })();
  }, []);

  const trackItemRenderer = ({item} : {item: AddTrack}) => {
    return (
      <View>
        <TrackItem
          image={item.artwork ?? ""}
          navigation={navigation}
          title={item.title ?? "Unknown Title"}
          trackArtist={item.artist ?? "Unknown artist"}
          musicPath={item.url}
          key={item.url}
          active={item.url === activeTrack} //This might need to be global state where we compare against what is actually in the track plager
          setMeActive={() => setActiveTrack(item.url)}/>
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