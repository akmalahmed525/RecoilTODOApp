import React, {FC} from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppRoot} from '@src/configs';
import {StatusBar} from 'react-native';

type AppProps = {};
const App: FC<AppProps> = () => (
  <RecoilRoot>
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
        <AppRoot />
      </SafeAreaProvider>
    </NavigationContainer>
  </RecoilRoot>
);

export default App;
