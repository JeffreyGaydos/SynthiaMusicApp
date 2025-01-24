import React, { useEffect, useState } from 'react';
import MainTabs from './MainTabs';
import TrackPlayer from 'react-native-track-player';
import { PermissionsAndroid, PermissionStatus } from 'react-native';

//super useful for getting your types right: https://github.com/react-navigation/react-navigation/blob/968840cb4f98303562de9e29fae7fbfda9c8d2fa/packages/core/src/types.tsx
function App(): React.JSX.Element {

  const [externalStoragePermissionGranted, setExternalStoragePermissionGranted] = useState<PermissionStatus | undefined>();

  (async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (e) {
      if(e == "Error: The player has already been initialized via setupPlayer") {
        console.warn(e);
      }
    }
  })();

  const requestExternalStorageAccess = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Synthia Music App',
        message:
          'Synthia needs to access your music files!',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    setExternalStoragePermissionGranted(granted);
  }

  useEffect(() => {
    (async () => {
      await requestExternalStorageAccess();
    })();
  }, []);

  return (
    <MainTabs/>
  );
}

export default App;