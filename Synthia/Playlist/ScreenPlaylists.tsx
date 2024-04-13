import React from 'react';
import Screen from '../Screen';
import Playlists from './Playlists';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { s_navigation } from '../styles';
import routes from '../routes';
import PlaylistDetails from './PlaylistDetails';

function PlaylistsScreen({ navigation }: {navigation: any}) {

    

    const Stack = createNativeStackNavigator();

    return (
        <Screen>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: s_navigation.tab_screen
                }}
                initialRouteName={routes.PlaylistStack.Main}
            >
                <Stack.Screen name={routes.PlaylistStack.Main} component={Playlists} />
                <Stack.Screen name={routes.PlaylistStack.Details} component={PlaylistDetails} />
            </Stack.Navigator>
        </Screen>
    );
}

export default PlaylistsScreen