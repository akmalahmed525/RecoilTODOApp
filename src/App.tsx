import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppRoot} from '@src/configs';

type AppProps = {};
const App: FC<AppProps> = () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <AppRoot />
    </SafeAreaProvider>
  </NavigationContainer>
);

export default App;
