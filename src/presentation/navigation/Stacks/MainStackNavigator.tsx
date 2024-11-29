import { createStackNavigator } from '@react-navigation/stack'

import MainDrawer from '../Drawer/MainDrawer';
import Settings from '../screens/Settings';
import Legal from '../screens/Legal';
import About from '../screens/About';
import ListCodCities from '../screens/CodificatsScreen';
import CodificatsScreen from '../screens/CodificatsScreen';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainDrawer}
        options={{
          title: 'Main',
          headerShown: false,
        }}
      />
      <Stack.Screen name="Settings" options={{ title: "Configuració" }} component={Settings} />
      <Stack.Screen name="Codificados" options={{ title: "Codificados" }} component={CodificatsScreen} />
      <Stack.Screen name="Legal" options={{ title: "Legal" }} component={Legal} />
      <Stack.Screen name="About" options={{ title: "A sobre de..." }} component={About} />
    </Stack.Navigator>
  )
}
