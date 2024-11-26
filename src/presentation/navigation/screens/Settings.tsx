import { MaterialCommunityIcons } from '@expo/vector-icons';
import { version } from '../../../../package.json';

import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Appearance, ColorSchemeName, ScrollView } from 'react-native';
import { RadioButton, Switch } from 'react-native-paper';
import { Container } from '../../components/Container';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useSettingsContext from '../../../contexts/SettingsContext';


export default function Settings({ navigation, route }: any) {

  const { colors } = useTheme() as unknown as IAppTheme;

  const [valueTheme, setValueTheme] = useState('dark');   //radioButton thema 

  const [isEnabledKeepAwake, setIsEnabledKeepAwake] = useState(false);   //switch
  const [isEnabledEscriu, setIsEnabledEscriu] = useState(false);        //switch
  const [IsEnabledRessaltar, setIsEnabledRessaltar] = useState(false);  //switch

  const { setContextTheme,
    setContextHighlightResult,
    setContextKeepAwake,
    setContextSearchWhileTyping } = useSettingsContext();


  const toogleTheme = async (value: ColorSchemeName) => {
    Appearance.setColorScheme(value as ColorSchemeName),
      setValueTheme(value as any)
    setContextTheme(value)

    try {
      await AsyncStorage.setItem('theme', `${value}`);
    } catch (e) {
      // saving error
    }

  }

  const toggleSwitchPantalla = async (value: boolean) => {
    setIsEnabledKeepAwake(prevState => !prevState);
    value ? activateKeepAwakeAsync('pant') : deactivateKeepAwake('pant');
    setContextKeepAwake(value)


    try {
      await AsyncStorage.setItem('keepAwake', `${value}`);
    } catch (e) {
      // saving error
    }



  };

  const toggleSwitchEscriu = (value: boolean) => {
    setIsEnabledEscriu(prevState => !prevState);
    setContextSearchWhileTyping(value)

  };

  const toggleSwitchRessaltar = (value: boolean) => {
    setIsEnabledRessaltar(prevState => !prevState);
    setContextHighlightResult(value)
  };

  const getDataTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');      
      if (value !== null) {
        setValueTheme(value as any)        
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  };

  const getDataKeepAwake = async () => {
    try {
      const value = await AsyncStorage.getItem('keepAwake');
      if (value !== null) {
        value === 'true' && setIsEnabledKeepAwake(true)
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  };

  useEffect(() => {
    getDataTheme();
    getDataKeepAwake();

  }, [])


  const ICONSIZE = 22;

  const styles = StyleSheet.create({


    textRadio: {
      color: colors.text,
      fontSize: 18,
      // marginBottom: 20
    },
    textSmall: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '300'
    },
    textTitles: {
      color: colors.text,
      fontSize: 16,
      marginTop: 20,
      marginLeft: 25,
      fontWeight: 500
    },
    card: {
      backgroundColor: colors.card,
      color: colors.text,
      margin: 10,
      minHeight: 25,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: colors.backGroundTitleBar,
    },

    radioGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 25,
      marginRight: 25,
      // paddingLeft:25,
      // paddingRight:25,
      marginTop: 8,
      marginBottom: 8,
      justifyContent: 'space-between',
    },
    switch: {
      marginRight: 0
    },
    iconStyle: {
      marginRight: 15
    }
  });

  return (

    <Container>
      <Text style={styles.textTitles}>Tema</Text>
      <View style={styles.card}>
        <RadioButton.Group onValueChange={(value: any) => toogleTheme(value)}
          value={valueTheme}>
          <View style={styles.radioGroup} >
            <View style={styles.radioGroup}>
              <MaterialCommunityIcons
                name='theme-light-dark'
                size={ICONSIZE}
                color={colors.text}
                style=
                {{ ...styles.iconStyle }}
              />
              <Text style={styles.textRadio}>Automàtic</Text>
            </View>
            <RadioButton value="auto" />
          </View>
          <View style={styles.radioGroup} >
            <View style={styles.radioGroup}>
              <MaterialCommunityIcons
                name='white-balance-sunny'
                size={ICONSIZE}
                color={colors.text}
                style={{ ...styles.iconStyle }}
              />
              <Text style={styles.textRadio}>Light</Text>
            </View>
            <RadioButton value="light" />
          </View>
          <View style={styles.radioGroup} >
            <View style={styles.radioGroup}>
              <MaterialCommunityIcons
                name='moon-waning-crescent'
                size={ICONSIZE}
                color={colors.text}
                style={{ ...styles.iconStyle }}
              />
              <Text style={styles.textRadio}>Dark</Text>
            </View>
            <RadioButton value="dark" />
          </View>
        </RadioButton.Group>

      </View>
      <Text style={[styles.textSmall, { marginLeft: 17, marginRight: 15 }]}>Automàtic només és compatible amb sistemes operatius que us permeten controlar la combinació de colors a tot el sistema.</Text>
      <Text style={styles.textTitles}>Pantalla</Text>
      <View style={styles.card}>
        <View style={styles.radioGroup}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRadio}>Pantalla encesa</Text>
            <Text style={styles.textSmall}>Mentre estigui oberta l'aplicació, manté sempre la pantalla encesa sense bloquejar-la.</Text>
          </View>

          <Switch
            value={isEnabledKeepAwake}
            onValueChange={(value) => toggleSwitchPantalla(value)}
            // disabled={colorScheme === 'dark'}
            style={styles.switch}
          />
        </View>
      </View>
      <Text style={styles.textTitles}>Cerca</Text>
      <View style={styles.card}>
        <View style={styles.radioGroup}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRadio}>Cercar mentre s'escriu</Text>
            <Text style={styles.textSmall}>Mostra resultats a la vegada que es va escribint el text</Text>
          </View>

          <Switch
            value={isEnabledEscriu}
            onValueChange={(value) => toggleSwitchEscriu(value)}
            // disabled={colorScheme === 'dark'}
            style={styles.switch}
          />
        </View>
        <View style={styles.radioGroup}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRadio}>Ressaltar el resultat</Text>
            <Text style={styles.textSmall}>Ressaltar, en un altre color, les paraules trobades.</Text>
          </View>

          <Switch
            value={IsEnabledRessaltar}
            onValueChange={(value) => toggleSwitchRessaltar(value)}
            // disabled={colorScheme === 'dark'}
            style={styles.switch}
          />
        </View>
      </View>
      <Text style={styles.textTitles}>App Info</Text>
      <View style={styles.card}>
        <View style={styles.radioGroup} >
          <Text style={styles.textRadio}>Client version</Text>
          <Text style={styles.textRadio}>{version}</Text>
        </View>
      </View>
    </Container>
  );


}


