

import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from "react-native";


import { useTheme } from "@react-navigation/native";

import { useEffect, useRef, useState } from "react";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import useInfraccionsContext from "../../../contexts/InfraccionsContext";
import { capitalizedText, stringToArrayWords } from "../../../utils";
import { FlatListInfraccions } from "../../components/FlatListInfraccions";
import { ICodificats, IOrdenanca, OrdenancaStandard } from "../../../interfaces";


var { width } = Dimensions.get('window');

export default function CodificatsScreen({ navigation, route }: any) {

  const { id: id_city, name_city }: {
    id: number, name_city: string
  } = route.params.data;


  const { state, dispatch } = useInfraccionsContext();
  const { currentCodificat, infraccionsToShow, select1, select2, codificatsCity }: {
    currentCodificat: ICodificats, select1: ItemType<ValueType>[], select2: ItemType<ValueType>[], infraccionsToShow: OrdenancaStandard[], codificatsCity: ICodificats[]
  } = state;



  const { colors } = useTheme() as unknown as IAppTheme;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  // const [items, setItems] = useState<any>();
  const [valueSearch, setValueSearch] = useState<string>();

  const ref = useRef<any>(null);

  useEffect(() => {
    dispatch({ type: "load_default_infraccions", payload: id_city })
    console.log(select1)
  }
    , [])

  useEffect(() => {
    const arrayStrings = stringToArrayWords(valueSearch, 3)
    encodeURIComponent(arrayStrings as unknown as string) !== state.lastSearch &&
      dispatch({ type: "filter_by_search", payload: arrayStrings })
  }, [valueSearch]);

  useEffect(() => {

    navigation.setOptions({

      headerTitle: () => <DropDownPicker
        listItemContainerStyle={{
          backgroundColor: colors.borderCard,
          maxWidth: width,
        }}
        modalContentContainerStyle={{ backgroundColor: colors.backgroundCard }}
        customItemLabelStyle={{ margin: 15 }}
        dropDownContainerStyle={{
          backgroundColor: colors.background,
          width: width - 25,
          marginLeft: 13,
          borderWidth: 3,
          marginTop: 15,
          borderRadius: 15,
          borderColor: colors.text
        }}
        language="ES"
        itemSeparator={true}
        itemSeparatorStyle={{ backgroundColor: colors.text }}
        searchable={true}
        searchPlaceholder="Cercar per codificat..."
        searchWithRegionalAccents={true}
        listMode="MODAL"
        modalAnimationType="slide"
        textStyle={{ color: colors.text }}
        open={open}
        value={value}
        items={codificatsCity?.map((cod: { label_nav: any; name_cod: any; }) => { return { label: cod.label_nav, value: cod.name_cod } })}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={(item) => {
          dispatch({ type: "change_cod", payload: codificatsCity?.find((i) => i.name_cod == item.value) })
          ref?.current?.setText("");
        }}
        placeholder={`Llista de codificats ${capitalizedText(name_city)}`}
        style={{
          borderWidth: 0.5,
          marginTop: 10,
          width: width - 110,
          backgroundColor: colors.borderCard,
          minHeight: 40
        }}
      />
      ,
      headerSearchBarOptions: {
        placeholder: "Cercar...",
        onChangeText: (event: any) => {
          setValueSearch(event.nativeEvent.text)
        },
        ref,

      }
    })
    return () => {
    }
  }, [navigation, open, value])

 
 
  return (

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {stringToArrayWords(valueSearch, 3).length > 0 &&
        <Text style={{ marginBottom: -10, color: colors.primaryBlue }}>Numero infraccions trobades:
          {` ${infraccionsToShow?.length}`}
        </Text>}

      {select1.length && <DropDownPicker
        listItemContainerStyle={{
          backgroundColor: colors.borderCard,
          maxWidth: width,
        }}
        modalContentContainerStyle={{ backgroundColor: colors.backgroundCard }}
        customItemLabelStyle={{ margin: 15 }}
        dropDownContainerStyle={{
          backgroundColor: colors.background,
          width: width - 25,
          marginLeft: 13,
          borderWidth: 3,
          marginTop: 15,
          borderRadius: 15,
          borderColor: colors.text
        }}
        language="ES"
        itemSeparator={true}
        itemSeparatorStyle={{ backgroundColor: colors.text }}
        searchable={true}
        searchPlaceholder="Cercar per codificat..."
        searchWithRegionalAccents={true}
        listMode="MODAL"
        modalAnimationType="slide"
        textStyle={{ color: colors.text }}
        open={open1}
        value={value1}
        items={select1}
        setOpen={setOpen1}
        setValue={setValue1}
        onSelectItem={(item) => {
          // dispatch({ type: "change_cod", payload: codificatsCity?.find((i) => i.name_cod == item.value) })
          // ref?.current?.setText("");
        }}
        // setItems={setItems}
        placeholder={`${currentCodificat?.label_select_1}`}
        // renderListItem={(props) =>
        //   <View><Text>Hola</Text></View> 
        //  }        

        style={{
          borderWidth: 1,
          marginTop: 15,
          marginLeft: 15,
          marginBottom: 4,
          maxWidth: width - 30,
          backgroundColor: colors.backgroundCard,
          minHeight: 30
        }}

      />

      }

      
      {select2.length && <DropDownPicker
        listItemContainerStyle={{
          backgroundColor: colors.borderCard,
          maxWidth: width,
        }}
        modalContentContainerStyle={{ backgroundColor: colors.backgroundCard }}
        customItemLabelStyle={{ margin: 15 }}
        dropDownContainerStyle={{
          backgroundColor: colors.background,
          width: width - 25,
          marginLeft: 13,
          borderWidth: 3,
          marginTop: 15,
          borderRadius: 15,
          borderColor: colors.text
        }}
        language="ES"
        itemSeparator={true}
        itemSeparatorStyle={{ backgroundColor: colors.text }}
        searchable={true}
        searchPlaceholder="Cercar per codificat..."
        searchWithRegionalAccents={true}
        listMode="MODAL"
        modalAnimationType="slide"
        textStyle={{ color: colors.text }}
        open={open2}
        value={value2}
        items={select2}
        setOpen={setOpen2}
        setValue={setValue2}
        onSelectItem={(item) => {
          // dispatch({ type: "change_cod", payload: codificatsCity?.find((i) => i.name_cod == item.value) })
          // ref?.current?.setText("");
        }}
        // setItems={setItems}
        placeholder={`${currentCodificat?.label_select_2}`}
        // renderListItem={(props) =>
        //   <View><Text>Hola</Text></View> 
        //  }        

        style={{
          borderWidth: 1,
          marginTop: -4,
          marginLeft: 15,
          marginBottom: 10,
          maxWidth: width - 30,
          backgroundColor: colors.backgroundCard,
          minHeight: 30
        }}
      />}
      <FlatListInfraccions />


    </View>
  );
}
const styles = StyleSheet.create({
});




