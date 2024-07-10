import React from 'react';
import MainTabs from './MainTabs';
import TrackPlayer from 'react-native-track-player';

//super useful for getting your types right: https://github.com/react-navigation/react-navigation/blob/968840cb4f98303562de9e29fae7fbfda9c8d2fa/packages/core/src/types.tsx
function App(): React.JSX.Element {

  (async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (e) {
      if(e == "Error: The player has already been initialized via setupPlayer") {
        console.warn(e);
      }
    }
  })();

  return (
    <MainTabs/>
  );
}

export default App;