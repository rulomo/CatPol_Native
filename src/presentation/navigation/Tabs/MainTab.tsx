
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getFocusedRouteNameFromRoute, useTheme } from '@react-navigation/native';

import { DelictesTab } from './TabScreens/DelictesTab';
import { CatalogadorTab } from './TabScreens/CatalogadorTab';
import { CodificadosTab } from './TabScreens/CodificadosTab';
import { TablasTab } from './TabScreens/TablasTab';
import { CalendariTab } from './TabScreens/CalendariTab';

//Icons
function makeIconRender(name: keyof typeof MaterialCommunityIcons.glyphMap | undefined) {
  return ({ color, size }: { color: any, size: any }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

export const Tabs = ({ navigation, route }: any) => {

  const Tab = createBottomTabNavigator();
  const { colors } = useTheme() as unknown as IAppTheme;


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0
        },
        headerShown: false,
      }}
      screenListeners={{ focus: e => navigation.setOptions({ headerTitle: getFocusedRouteNameFromRoute(route) }) }}
    >
      <Tab.Screen
        name="Codificats"
        component={CodificadosTab}
        options={{ tabBarIcon: makeIconRender("home"), title: "Codificats" }}

      />
      <Tab.Screen
        name="Taules"
        component={TablasTab}
        options={{ tabBarIcon: makeIconRender("table"), title: "Taules" }}
      />
      <Tab.Screen
        name="Delictes"
        component={DelictesTab}
        options={{ tabBarIcon: makeIconRender("handcuffs"), title: "Delictes" }}
      />
      <Tab.Screen
        name="Catalogador"
        component={CatalogadorTab}
        options={{ tabBarIcon: makeIconRender("family-tree"), title: "Catalogador" }}
      />
      <Tab.Screen
        name="Calendari"
        component={CalendariTab}
        options={{ tabBarIcon: makeIconRender('calendar'), title: "Calendari" }}
      />
    </Tab.Navigator>
  )
}
