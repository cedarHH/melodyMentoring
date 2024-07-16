import { AppRegistry } from 'react-native';
import App from './src/App';
import { expo as appConfig} from './app.json';

AppRegistry.registerComponent(appConfig.name, () => App);
