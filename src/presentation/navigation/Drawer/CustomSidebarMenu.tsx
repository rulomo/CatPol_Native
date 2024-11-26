

import { View, Text, Linking, SafeAreaView, Image, StyleSheet, useColorScheme } from 'react-native';

import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DarkTheme, useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';



export const CustomSidebarMenu = (props: any) => {

  const { navigation }=props;

  const { colors } = useTheme() as unknown as IAppTheme;

  const logo = require('../../../../assets/icon-192x192.png')

  const insets = useSafeAreaInsets();   //Salvar el notch

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={{ backgroundColor: colors.borderCard, marginTop: insets.top, }}>
        <Image
          source={logo}
          style={{ ...styles.sideMenuProfileIcon }}

        />
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 14, color: colors.drawerText }}>Codificats Policials - CatPol</Text>
        </View>
      </View>
      {/*Top Large Image */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />        
        <DrawerItem
          labelStyle={styles.customItem}
          label={'Configuració'}
          onPress={() => {navigation.navigate('Settings') }}
          icon={({size,color})=>
            <MaterialCommunityIcons 
              name='cog' 
              size={size}  
              color={color} 
              style={{...styles.iconStyle}} 
              />
          }
        />
        {/* <DrawerItem
          labelStyle={styles.customItem}
          label={'Legal'}
          onPress={() => {navigation.navigate('Legal') }}
          icon={({size,color})=>
            <MaterialCommunityIcons 
              name='gavel' 
              size={size}  
              color={color} 
              style={{...styles.iconStyle}} 
              />
          }
        /> */}
        <DrawerItem
          labelStyle={styles.customItem}
          label={'Contacte'}
          onPress={() => { Linking.openURL('mailto:elcorreoquequieres@correo.com?Subject=Aquí%20el%20asunto%20del%20mail') }}
          icon={({size,color})=>
            <MaterialCommunityIcons 
              name='email-send' 
              size={size}  
              color={color} 
              style={{...styles.iconStyle}} 
              />
          }
        />
        <DrawerItem
          labelStyle={{...styles.customItem}}
          label={'Compartir App'}
          onPress={() => { Linking.openURL('mailto:elcorreoquequieres@correo.com?Subject=Aquí%20el%20asunto%20del%20mail') }}
          icon={({size,color})=>
            <MaterialCommunityIcons 
              name='share' 
              size={size}  
              color={color} 
              style={{...styles.iconStyle}} 
            />
          }
        />
        <DrawerItem
          labelStyle={styles.customItem}
          label={'A sobre de...'}
          onPress={() => {navigation.navigate('About') }}
          icon={({size,color})=>
            <MaterialCommunityIcons 
              name='gavel' 
              size={size}  
              color={color} 
              style={{...styles.iconStyle}} 
              />
          }
        />
         
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 15,
          textAlign: 'center',
          color: colors.drawerText,
          marginBottom: 10
        }}
        onPress={() => {
          Linking.openURL('https://www.catpol.es/');
        }}>
        www.CatPol.es
      </Text>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'flex-start',
  },
  iconStyle: {  
  },
  customItem: {   
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '600',
  },
});