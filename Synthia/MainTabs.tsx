import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  View,
} from 'react-native';
import NotificationFooter from './NotificationFooter';
import ScreenPlaylists from './ScreenPlaylists';
import ScreenArtists from './ScreenArtists';
import ScreenAlbums from './ScreenAlbums';
import ScreenMoods from './ScreenMoods';
import ScreenTracks from './ScreenTracks';
import { s_navigation, _navigation } from './styles';

function MainTabs(): React.JSX.Element {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: s_navigation.tab_bar,
          tabBarLabelStyle: s_navigation.tab_label,
          tabBarActiveTintColor: _navigation._colorActive,
          tabBarInactiveTintColor: _navigation._colorAccent,
          tabBarIcon: ({focused, color, size}) => {
            if(focused) {
              return <View style={s_navigation.tab_active}></View>
            } else {
              return <View style={s_navigation.tab_inactive}></View>
            }
          }
        }}
        sceneContainerStyle={s_navigation.tab_screen}
      >
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