import React from 'react';
import {
  Text,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

function Playlists({ navigation }: {navigation: any}) {

    const Stack = createNativeStackNavigator();

    return (
        <Text style={{fontSize: 30}}>Playlists</Text>
    );
}

export default Playlists