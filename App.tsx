import React from 'react';
import Navigate from './navigate';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {store} from './store';
import {Provider} from 'react-redux';

// import {GestureHandlerRootView} from 'react-native-gesture-handler';

/*function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigate />;
    </GestureHandlerRootView>
  );
}*/

const HomeScreen = () => <Navigate />;

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  </ApplicationProvider>
);

//function App(): React.JSX.Element {
//  return <Navigate />;
//}

// export default App;
