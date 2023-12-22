import React, { Children, useEffect, useState } from 'react';
import {
    GestureResponderEvent,
  Text, View,
} from 'react-native';

interface ScreenProps {
    leftCallback: () => void,
    rightCallback: () => void,
    children: React.ReactElement
}

type vector2 = {
    x: number,
    y: number
}

export default function Screen(screenProps: ScreenProps) {
    const { leftCallback, rightCallback, children } = screenProps;
    const [delta, setDelta] = useState<vector2>({ x: 0, y: 0 });
    const [previous, setPrevious] = useState<vector2>({ x: -1, y: -1 });
    const [swipeRightState, setSwipeRightState] = useState<boolean | undefined>();
    const swipeThreshold = 65;

    function TouchMoveHandler(e: GestureResponderEvent) {
        const currentDeltaX = previous.x == -1 ? 0 : e.nativeEvent.locationX - previous.x;
        const currentDeltaY = previous.y == -1 ? 0 : e.nativeEvent.locationY - previous.y;

        setDelta((prevState) => {
            return {
                x: prevState.x + currentDeltaX,
                y: prevState.y + currentDeltaY
            }
        });

        CheckSwipe(delta.x);

        setPrevious({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
    }

    function TouchStartHandler(e: GestureResponderEvent) {
        setDelta({ x: 0, y: 0 });
        setPrevious({ x: -1, y: -1 });        
        setSwipeRightState(undefined);
    }

    function CheckSwipe(deltaX: number) {
        if(deltaX > swipeThreshold) {
            setSwipeRightState(true);
        } else if(deltaX < -1 * swipeThreshold) {
            setSwipeRightState(false);
        } else {
            setSwipeRightState(undefined);
        }
    }

    function TouchReleaseHandler(e: GestureResponderEvent) {
        if(swipeRightState === undefined) return;
        if(swipeRightState) {
            console.log("Swipe Right");
            rightCallback();
            TouchStartHandler(e);
        } else {
            console.log("Swipe Left");
            leftCallback();
            TouchStartHandler(e);
        }
    }

    return (
        <View
            style={{height: "100%"}}
            onTouchMove={(e) => TouchMoveHandler(e)}
            onTouchStart={(e) => TouchStartHandler(e)}
            onTouchEndCapture={(e) => TouchReleaseHandler(e)}
        >{children}</View>
    );
}