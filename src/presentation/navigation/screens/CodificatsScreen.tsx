

import { useSQLiteContext } from "expo-sqlite";
import { Button, View, Text, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from "react-native";
import { ICodificats, IOrdenanca, OrdenancaStandard } from "../../../interfaces";
import { Card, Title } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

var {height, width} = Dimensions.get('window');

export default function CodificatsScreen({ navigation, route }: any) {


  const { id: id_cod } = route.params.data;

  const db = useSQLiteContext();


  function getCodcity() {
    try {
      const dataTC: ICodificats[] = db.getAllSync(`SELECT * from codificats WHERE id_city = ${id_cod}`);
      return dataTC;
    } catch (err) {
      console.log(err);
      return []; // or whatever you want
    }
  }

  function getInfraccionsCod (defaultCod:ICodificats|undefined) {
    if (defaultCod){
      const {id_city} = defaultCod;
      try {
        const dataTC: OrdenancaStandard[] = db.getAllSync(`SELECT * from ${defaultCod.name_cod}`);
        return dataTC
      } catch (error) {
        console.log(error)
        return []
      }
    }
    return []
    }

  const dataDB: ICodificats[] = getCodcity();

  const defaultCod: ICodificats | undefined = dataDB.find((i)=>i.is_main)

  const infraccions:OrdenancaStandard[] = getInfraccionsCod(defaultCod)
  
  console.log(infraccions[0])

  const { colors } = useTheme() as unknown as IAppTheme;
  
  return (


    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <FlatList
        
        data={dataDB}
        renderItem={({ item }: ListRenderItemInfo<ICodificats>) => (
          <Card
            style={[styles.card, { backgroundColor: colors.backgroundCard, }]}
            accessible
          >

            <Card.Content style={[styles.cardContent]}>
              <Title style={[styles.title, { color: colors.text }]}>
                {item.field_1}
              </Title>
            </Card.Content>
            <Card.Content style={styles.bottom}>
              <Title style={[styles.title, { color: colors.text }]}>
                {item.label_nav}
              </Title>
            </Card.Content>
          </Card >
        )}
      // keyExtractor={(item: ICity) => `${item.id}`}
      // numColumns={2}
       contentContainerStyle={styles.flStyle}
      >
      </FlatList >

      <Text style={{ color: `white` }}>This is a lista codificats per city screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
const styles = StyleSheet.create({
  flStyle: {    
    alignSelf:'stretch'
  },
  card: {
    marginTop: 7,
    width: width - 25,
    borderWidth: 3,
  },
  cardContent: {
    alignItems:'center'
  },
  
  bottom: {
    borderTopWidth: 2,
    alignItems: 'center'
  },
  title: {
    fontWeight: 600,
    textTransform: 'capitalize', 
    textAlign:'center'   
  }
});




