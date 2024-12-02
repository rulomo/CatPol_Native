import { useNavigation, useTheme } from '@react-navigation/native';
import {  StyleSheet, Image, useColorScheme, ListRenderItemInfo, TouchableOpacity } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite';
import { ICity } from '../../../../interfaces';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Card, Divider, Paragraph, Title } from 'react-native-paper';

import * as ESCUDOS from '../../../../../assets/escudos'
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import { StackNavigationProp } from '@react-navigation/stack';

export const CodificadosTab = () => {
    const { colors } = useTheme() as unknown as IAppTheme;
    const theme = useColorScheme();

    const db = useSQLiteContext();
    const dataDB: ICity[] = db.getAllSync('SELECT * from cities')

    
    type StackParamList = {
        Codificados:any,
        data:ICity        
    }
    
    type NavigationProps = StackNavigationProp<StackParamList>
    
    const navigation = useNavigation<NavigationProps>();

    return (


        <FlatList
            data={dataDB}
            renderItem={({ item }: ListRenderItemInfo<ICity>) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Codificados", {data: item } )
                     
                    }}
                >
                    <Card
                        style={[styles.card, { backgroundColor: colors.backgroundCard, }]}
                        accessible
                    >
                     
                        <Card.Content style={[styles.cardContent]}>
                            <Image
                                style={styles.imagen}
                                source={ESCUDOS[`${item.img as keyof typeof ESCUDOS}`]
                                }
                            />
                        </Card.Content>
                        <Card.Content style={styles.bottom}>
                            <Title style={[styles.title, { color: colors.text }]}>
                                {item.img}
                            </Title>
                        </Card.Content>
                    </Card >
                </TouchableOpacity>
            )}
            keyExtractor={(item: ICity) => `${item.id}`}
            numColumns={2}
            contentContainerStyle={styles.flStyle}
        >
        </FlatList >
    )
}
const styles = StyleSheet.create({
    flStyle: {
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'blue',
        shadowOpacity: 1
    },
    card: {
        margin: 10,
        width: 150,
        borderWidth: 3,
    },
    cardContent: {
        width: 100,
        display: 'flex',
        height: 160,

    },
    imagen: {
        width: 115,
        height: 140,
        resizeMode: 'contain',
    },
    bottom: {
        borderTopWidth: 2,
        alignItems: 'center'
    },
    title: {
        fontWeight: 600,
        textTransform: 'capitalize'
    }

});





