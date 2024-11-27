import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, useColorScheme, ListRenderItemInfo, TouchableHighlight, Platform } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite';
import { ICity } from '../../../../interfaces';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

import * as ESCUDOS  from '../../../../../assets/escudos'

export const CodificadosTab = () => {
    const { colors } = useTheme() as unknown as IAppTheme;
    const theme = useColorScheme();


    const db = useSQLiteContext();
    const prueba: ICity[] = db.getAllSync('SELECT * from cities')
console.log(prueba)

    return (

        <FlatList
            data={prueba}
            renderItem={({ item }: ListRenderItemInfo<ICity>) => (
                <TouchableHighlight
                    key={item.id}
                // onPress={() => }
                // onShowUnderlay={separators.highlight}
                // onHideUnderlay={separators.unhighlight}
                >
                    <Card style={{backgroundColor:colors.backgroundCard}}>
                        {/* {console.log(item.img)} */}
                        <Card.Content>                            
                            <Image
                                style={styles.tinyLogo}
                                source={ESCUDOS[`catdalunya`]}
                            />
                            <Title>{item.img}</Title>
                            <Paragraph>Card content</Paragraph>
                        </Card.Content>                       
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions>
                        <Card.Title title="Card Title" subtitle="Card Subtitle" />
                    </Card>
                </TouchableHighlight>
            )}
            keyExtractor={(item: ICity) => `${item.id}`}
            numColumns={2}
        >

        </FlatList>



    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tinyLogo: {
      width: 150,
      height: 150,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });





