

import { useSQLiteContext } from "expo-sqlite";
import { Button, View, Text, FlatList, ListRenderItemInfo } from "react-native";
import { ICodificats } from "../../../interfaces";

export default function CodificatsScreen({ navigation, route }: any) {


  const { id: id_cod } = route.params.data;

  const db = useSQLiteContext();


  function trycatch() {
    try {
      const dataTC:ICodificats[]= db.getAllSync(`SELECT * from codificats WHERE id_city = ${id_cod}`);
      return dataTC;
    } catch (err) {
      console.log(err);
      return []; // or whatever you want
    }
  }

  const dataDB: ICodificats[] = trycatch();


  return (

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <FlatList
        data={dataDB}       
        renderItem={({ item }: ListRenderItemInfo<ICodificats>) => (
          <View><Text>{item.label_nav}</Text></View>
        )}
        // keyExtractor={(item: ICity) => `${item.id}`}
        // numColumns={2}
        // contentContainerStyle={styles.flStyle}
      >
      </FlatList >

      <Text style={{ color: `white` }}>This is a lista codificats per city screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}




