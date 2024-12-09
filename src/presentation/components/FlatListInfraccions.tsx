import { Dimensions, FlatList,Text,StyleSheet,ListRenderItemInfo, View } from "react-native"
import useInfraccionsContext from "../../contexts/InfraccionsContext"
import { Card } from "react-native-paper";
import { ICodificats, OrdenancaStandard } from "../../interfaces";
import { useTheme } from "@react-navigation/native";
import { EstandaritzedArticles } from "../../utils";
import { FC, useEffect } from "react";
import { CardInfraccions1 } from "./CardInfraccions1";

let { height, width } = Dimensions.get('window');



export const FlatListInfraccions=({}) => {

  const { state, dispatch } = useInfraccionsContext();
  const {infraccionsToShow:infraccions, currentCodificat} = state;
  
    
     return (
      
        <FlatList
        data={infraccions}
        renderItem={({ item }: ListRenderItemInfo<OrdenancaStandard>) => (
         <CardInfraccions1 infraccio={item}  /> 
        )}
        keyExtractor={(item: OrdenancaStandard) => `${item.id}`}
        // numColumns={2}
        contentContainerStyle={styles.flStyle}
      >
      </FlatList >
    )
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
    textoInfra: {
      lineHeight: 22,
      textAlign: 'justify'
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