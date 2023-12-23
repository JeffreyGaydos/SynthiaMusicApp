import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import NotificationFooter from './NotificationFooter';
import ScreenPlaylists from './ScreenPlaylists';
import ScreenArtists from './ScreenArtists';
import ScreenAlbums from './ScreenAlbums';
import ScreenMoods from './ScreenMoods';
import ScreenTracks from './ScreenTracks';
import { s_navigation, _navigation } from './styles';

function MainTabs(): React.JSX.Element {

  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: s_navigation.tab_bar,
          tabBarLabelStyle: s_navigation.tab_label,
          tabBarActiveTintColor: _navigation._colorActive,
          tabBarInactiveTintColor: _navigation._colorAccent,
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
      <NotificationFooter />
    </NavigationContainer>
  );
}

export default MainTabs;