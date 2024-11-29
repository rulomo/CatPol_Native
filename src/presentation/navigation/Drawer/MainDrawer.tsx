import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomSidebarMenu } from './CustomSidebarMenu';
import { Tabs } from '../Tabs/MainTab';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {

  return (

    <Drawer.Navigator
      initialRouteName="Principal"
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 15,
          fontFamily: 'System',
          fontWeight: '800',
        },

      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Principal"
        component={Tabs}
        options={() => ({
          title: 'Codificats',
          drawerItemStyle: {
            display: 'none'
          }  //Principal de Tabs que no lo muestre en el Drawer          
        })}
      />

    </Drawer.Navigator>
  )
}

