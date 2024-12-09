

import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from "react-native";


import { useTheme } from "@react-navigation/native";

import { useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useDefaultCodificat } from "../../../hooks";
import useInfraccionsContext from "../../../contexts/InfraccionsContext";
import { stringToArrayWords } from "../../../utils";
import { FlatListInfraccions } from "../../components/FlatListInfraccions";
import { ICodificats, OrdenancaStandard } from "../../../interfaces";


var { height, width } = Dimensions.get('window');

export default function CodificatsScreen({ navigation, route }: any) {
  
  const { id: id_city } = route.params.data;
  
  const {state:states}=useDefaultCodificat({id_city})
  const { state, dispatch } = useInfraccionsContext();
  
  const { colors } = useTheme() as unknown as IAppTheme;
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any>();
  const [valueSearch, setValueSearch] = useState<string>();
  
  const ref = useRef<any>(null);
  
  
  useEffect(() => {
    const arrayStrings = stringToArrayWords(valueSearch, 3)
    encodeURIComponent(arrayStrings as unknown as string) !== state.lastSearch &&
      dispatch({ type: "filter_by_search", payload: arrayStrings })
  }, [valueSearch]);

  useEffect(() => {
    navigation.setOptions({
      placeholder: "Cercar",      
      headerSearchBarOptions: {          
        placeholder: "Cercar...",
        onChangeText: (event: any) => {
          setValueSearch(event.nativeEvent.text)
        },
        hideWhenScrolling: false,
        ref,
      }
    })
    return () => {
    }
  }, [navigation])


  return (


    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DropDownPicker
        open={open}
        value={value}
        items={states.data.CodificatsCity?.map((cod: { label_nav: any; name_cod: any; }) => { return { label: cod.label_nav, value: cod.name_cod } })}
        setOpen={setOpen}
        setValue={setValue}
        // onSelectItem={(item) => {
        //   dispatch({ type: "change_cod", payload: codificatsCity?.find(i => i.name_cod == item.value) })
        //   ref?.current?.setText('');          
        // }}
        // setItems={setItems}
        placeholder={states.data?.infraccionsCodificat[0]?.norma || ""}
        // renderListItem={(props) =>
        //   <View><Text>Hola</Text></View> 
        //  }        
        style={{
          borderWidth: 3,
          marginTop: 10,
          marginLeft: 15,
          marginBottom: 10,
          maxWidth: width - 30,
          backgroundColor: colors.backGroundTitleBar,
        }}
      />
      <FlatListInfraccions id_City={id_city} />


    </View>
  );
}
const styles = StyleSheet.create({

});




