import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { MainStackNavigator } from './presentation/navigation/Stacks/MainStackNavigator';

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import AppLightTheme from './presentation/theme/appLightThem';
import AppDarkTheme from './presentation/theme/appDarkThem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import useSettingsContext, { SettingsContextProvider } from './contexts/SettingsContext';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

const getDataTheme = async () => {
  try {
    const value = await AsyncStorage.getItem('theme');
    if (value !== null) {
      Appearance.setColorScheme(value as ColorSchemeName)
    }
  } catch (e) {
    // error reading value
    console.log(e)
  }
};

export default function App() {


  const colorScheme = useColorScheme();
  const { setContextTheme } = useSettingsContext();

  useEffect(() => {
    getDataTheme()
    colorScheme && setContextTheme(colorScheme) //
  }, [])

  const selectTheme: IAppTheme = colorScheme === 'light'
    ? AppLightTheme : AppDarkTheme;



  const paperTheme = {
    ...DefaultTheme,
    colors: { primary: selectTheme.colors.primaryBlue } // Copy it from the color codes scheme and then use it here
  };

  return (
    <PaperProvider theme={paperTheme}>
      <SQLiteProvider databaseName="dba.db" assetSource={{ assetId: require('../assets/dba.db') }}>
        <SettingsContextProvider>
          <NavigationContainer
            theme={selectTheme}
          >
            <MainStackNavigator />
          </NavigationContainer>
        </SettingsContextProvider>
      </SQLiteProvider>
    </PaperProvider>

  );
}


