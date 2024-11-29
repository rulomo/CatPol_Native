import { registerRootComponent } from 'expo';
import App from './src/App';
import * as SQLite from 'expo-sqlite';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


const db = SQLite.deleteDatabaseSync('dba.db');   ///BORRAR EN PRODUCCION ESTA LINEA