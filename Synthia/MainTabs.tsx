import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import NotificationFooter from './NotificationFooter';
import ScreenPlaylists from './Playlist/ScreenPlaylists';
import ScreenArtists from './ScreenArtists';
import ScreenAlbums from './ScreenAlbums';
import ScreenMoods from './ScreenMoods';
import ScreenTracks from './Tracks/ScreenTracks';
import { s_navigation, _colors } from './styles';
import Player from './Player/Player.tsx';
import { AddTrack } from 'react-native-track-player';

export const PlayerTrack = React.createContext<{playerTrack: AddTrack | undefined, setPlayerTrack: React.Dispatch<React.SetStateAction<AddTrack | undefined>>}>({
  playerTrack: undefined,
  setPlayerTrack: () => {}
});

function MainTabs(): React.JSX.Element {
  const [track, setTrack] = useState<AddTrack | undefined>(undefined);
  const Tab = createMaterialTopTabNavigator();

  return (
    <PlayerTrack.Provider value={{ playerTrack: track, setPlayerTrack: setTrack }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: s_navigation.tab_bar,
            tabBarLabelStyle: s_navigation.tab_label,
            tabBarActiveTintColor: _colors._colorActive,
            tabBarInactiveTintColor: _colors._colorAccent,
            tabBarIndicatorStyle: s_navigation.tab_active,
            tabBarGap: 1,
            tabBarAndroidRipple: { borderless: false }
          }}
          sceneContainerStyle={s_navigation.tab_screen}>
          <Tab.Screen name="Playlists" component={ScreenPlaylists} />
          <Tab.Screen name="Artists" component={ScreenArtists} />
          <Tab.Screen name="Albums" component={ScreenAlbums} />
          <Tab.Screen name="Moods" component={ScreenMoods} />
          <Tab.Screen name="Tracks" component={ScreenTracks} />
        </Tab.Navigator>
        <Player addTrack={track}/>
        <NotificationFooter />
      </NavigationContainer>
    </PlayerTrack.Provider>
  );
}

export default MainTabs;