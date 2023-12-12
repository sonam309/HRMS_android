import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as ReduxProvider } from "react-redux";
import store from './redux/store';

const RNRedux = () => (
    // <NativeBaseProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    // </NativeBaseProvider>
  );


AppRegistry.registerComponent(appName, () => RNRedux);