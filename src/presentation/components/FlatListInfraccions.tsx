import { Dimensions, FlatList, StyleSheet, ListRenderItemInfo } from "react-native"
import useInfraccionsContext from "../../contexts/InfraccionsContext"
import { OrdenancaStandard } from "../../interfaces";
import { CardInfraccions1 } from "./CardInfraccions1";
import { CardInfraccions2 } from "./CardInfraccions2";

let { height, width } = Dimensions.get('window');

type flatInfraccions = {
  infraccio:OrdenancaStandard
  template:number
}

export const FlatListInfraccions = ({ }) => {

  const { state, dispatch } = useInfraccionsContext();
  const { infraccionsToShow: infraccions, currentCodificat } = state;  
  return (
    <FlatList
      data={infraccions}
      renderItem={({ item }: ListRenderItemInfo<flatInfraccions>) => (        
        item?.template === 1 ?
          <CardInfraccions1 infraccio={item.infraccio} /> :
          <CardInfraccions2 infraccio={item.infraccio as any} />
      )}
      keyExtractor={(item: flatInfraccions) => `${item?.infraccio?.id}`}
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
});