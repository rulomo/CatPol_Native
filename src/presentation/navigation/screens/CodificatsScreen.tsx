

import { useSQLiteContext } from "expo-sqlite";
import { Button, View, Text, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from "react-native";
import { ICodificats, IOrdenanca, OrdenancaStandard } from "../../../interfaces";
import { Card, Title } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { EstandaritzedArticles } from "../../../utils/strings";
import { useEffect } from "react";


var { height, width } = Dimensions.get('window');

export default function CodificatsScreen({ navigation, route }: any) {


  const { id: id_cod } = route.params.data;

  const db = useSQLiteContext();


  function getCodscity() {
    try {
      const dataTC: ICodificats[] = db.getAllSync(`SELECT * from codificats WHERE id_city = ${id_cod}`);
      return dataTC;
    } catch (err) {
      console.log(err);
      return []; // or whatever you want
    }
  }

  function getInfraccionsCod(defaultCod: ICodificats | undefined) {
    if (defaultCod) {
      const { id_city } = defaultCod;
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

  const dataDB: ICodificats[] = getCodscity();

  const defaultCod: ICodificats | undefined = dataDB.find((i) => i.is_main)

  const infraccions: OrdenancaStandard[] = getInfraccionsCod(defaultCod)

  const { colors } = useTheme() as unknown as IAppTheme;

  useEffect(() => {
    try {
      infraccions.sort((a, b) => parseInt(a.articulo) - parseInt(b.articulo))
    } catch (error) {
      console.log("no s'han pogut ordenar les infraccions")
    }
  }, [infraccions])


  return (


    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <FlatList

        data={infraccions}
        renderItem={({ item }: ListRenderItemInfo<OrdenancaStandard>) => (
          <Card
            style={[styles.card, { backgroundColor: colors.backgroundCard, }]}
            accessible
          >
            <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
              <Text style={[styles.title, { color: colors.text }]}>
                {item.norma}
              </Text>
            </Card.Content>
            <Card.Content style={styles.contentMiddle}>
              <View style={styles.twoColumns}>
                <Text style={[styles.middleText, { color: colors.text }]}>
                  Article: {EstandaritzedArticles(item.articulo, item.apartado, item.opcion)}
                </Text>
                <Text style={[styles.middleText, { color: colors.text }]}>
                  Punts: {item.puntos}
                </Text>
              </View>
              <View style={styles.twoColumns}>
                <Text style={[styles.middleText, { color: colors.text }]}>
                  Calificació: {item.calificacion}
                </Text>
                <Text style={[styles.middleText, { color: colors.text }]}>
                  Multa: {item.multa}
                </Text>
              </View>
            </Card.Content>
            <Card.Content style={[{ borderTopColor: colors.borderHovertileBar }, styles.ContentInfra]}>
              <Text style={[{ marginTop: 10, color: colors.text },styles.textoInfra]}>
                {item.texto}
              </Text>
            </Card.Content>
          </Card >
        )}
        keyExtractor={(item: OrdenancaStandard) => `${item.id}`}
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
    alignSelf: 'stretch'
  },
  card: {
    marginTop: 7,
    width: width - 25,
    borderWidth: 3,

  },
  cardContent: {
    alignItems: 'center'
  },
  contentTitle: {
    marginTop: -4,
    marginBottom: 5,
    borderBottomWidth: 2,

  },
  ContentInfra: {
    borderTopWidth: 2,
    marginTop: 10,    
  },
  textoInfra:{
    lineHeight:22,
    textAlign:'justify'
  },
  title: {
    // fontSize:14,
    fontWeight: 800,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: -4,
    marginBottom: 8,


  },
  contentMiddle: {
    marginBottom: 0
  },

  middleText: {
    marginTop: 5,
  },
  twoColumns: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'space-between',
  }
});




