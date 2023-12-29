import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import FullInfo from './components/FullInfo';
import Main from './components/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {IAlbums} from './common/interfaces';
import {Text, View} from 'react-native';
import FullInfoHeader from './components/FullInfoHeader';

export type RootStackParamList = {
  Main: undefined;
  FullInfo: IAlbums;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigate(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            header: FullInfoHeader,
          }}
        />
        <Stack.Screen
          name="FullInfo"
          component={FullInfo}
          options={{title: 'Информация'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
