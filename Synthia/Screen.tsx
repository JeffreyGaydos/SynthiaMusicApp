import React from 'react';
import { View } from 'react-native';

interface ScreenProps {
    children: React.ReactElement
}

export default function Screen(screenProps: ScreenProps) {
    const { children } = screenProps;

    return (
        <View style={{ height: "100%" }}>{children}</View>
    );
}