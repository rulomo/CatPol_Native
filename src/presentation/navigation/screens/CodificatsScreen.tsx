

import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from "react-native";


import { useTheme } from "@react-navigation/native";

import { useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import useInfraccionsContext from "../../../contexts/InfraccionsContext";
import { stringToArrayWords } from "../../../utils";
import { FlatListInfraccions } from "../../components/FlatListInfraccions";
import { ICodificats, IOrdenanca, OrdenancaStandard } from "../../../interfaces";


var { width } = Dimensions.get('window');

export default function CodificatsScreen({ navigation, route }: any) {

  const { id: id_city, name_city }: {
    id: number, name_city: string
  } = route.params.data;


  const { state, dispatch } = useInfraccionsContext();
  const { currentCodificat, infraccionsToShow,infraccionsTotals, codificatsCity }: {
    currentCodificat: ICodificats,infraccionsTotals:OrdenancaStandard[], infraccionsToShow: OrdenancaStandard[], codificatsCity: ICodificats[]
  } = state;



  const { colors } = useTheme() as unknown as IAppTheme;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState<any>();
  const [valueSearch, setValueSearch] = useState<string>();

  const ref = useRef<any>(null);

  useEffect(() => {
    dispatch({ type: "load_default_infraccions", payload: id_city })
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
        placeholder={`Llista de codificats ${name_city?.charAt(0).toUpperCase() + name_city?.slice(1)}`}
        style={{
          borderWidth: 3,
          marginTop: 10,
          width: width - 110,
          backgroundColor: colors.backGroundTitleBar,
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
  }, [navigation,value])


  const itemsForSelect1 = ()=>{
    debugger
    let items = new Set()
    let select1 = currentCodificat.select_2
    infraccionsTotals?.map(({infraccio})=>{ 
      debugger
        items.add(infraccio[`${select1}`])
    })
    
  }

  return (

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {stringToArrayWords(valueSearch, 3).length > 0 &&
        <Text style={{ marginBottom: -10, color: colors.primaryBlue }}>Numero infraccions trobades:
          {` ${infraccionsToShow?.length}`}
        </Text>}

      <DropDownPicker
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
        // setItems={setItems}
        placeholder={`${currentCodificat?.label_select_1}`}
        // renderListItem={(props) =>
        //   <View><Text>Hola</Text></View> 
        //  }        

        style={{
          borderWidth: 3,
          marginTop: 15,
          marginLeft: 15,
          marginBottom: 4,
          maxWidth: width - 30,
          backgroundColor: colors.backGroundTitleBar,
          minHeight: 30
        }}

      />




      <DropDownPicker
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
        // setItems={setItems}
        placeholder={`${currentCodificat?.label_select_2}`}
        // renderListItem={(props) =>
        //   <View><Text>Hola</Text></View> 
        //  }        

        style={{
          borderWidth: 3,
          marginTop: -6,
          marginLeft: 15,
          marginBottom: 10,
          maxWidth: width - 30,
          backgroundColor: colors.backGroundTitleBar,
          minHeight: 30
        }}
      />
      <FlatListInfraccions />


    </View>
  );
}
const styles = StyleSheet.create({
});




