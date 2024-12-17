import { FC, memo, } from "react";
import { ICodiPenal } from "../../interfaces";
import { standaritzedText } from "../../utils";
import useInfraccionsContext from "../../contexts/InfraccionsContext";
import { useTheme } from "@react-navigation/native";
import { Dimensions, Text, StyleSheet, View,  } from "react-native"
import { Card } from "react-native-paper";
import HighlightText from "@sanar/react-native-highlight-text";
import React from "react";

interface Props {
    infraccio?: ICodiPenal;
}

let { height, width } = Dimensions.get('window');


export const CardInfraccions2: FC<Props> = (({ infraccio }) => {

    const { state, dispatch } = useInfraccionsContext();

    const { colors } = useTheme() as unknown as IAppTheme;

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => {
    //     !window?.getSelection()?.toString() && setShow(true);
    // };

    //Quita los ## de los strings de los codificados con textos largos. 
    const parraStyle = (str: String) => {
        if (str.length > 0 || typeof str === "string") {
            return str.replaceAll("##", "")
        }
        return str
    }

    let fields = [];
    let numRows = 0;

    const { infraccionsToShow: infraccions, currentCodificat, lastSearch } = state;

    if (currentCodificat) {
        for (let i = 1; i < 100; i++) {
            let label = currentCodificat[`label_${i}`] as String;
            let field = currentCodificat[`field_${i}`] as "puntos";
            if (label) {
                fields.push({ label, field });
            } else {
                break;
            }
        }
        numRows = fields?.length ? Math.trunc(fields.length / 2 + 0.5) : 0;
    }
    // const rows_modal: string[] = currentCodificat?.order_all_fields?.split(";");

    const mainKeywords = decodeURIComponent(state.lastSearch as unknown as string).split(',')

    return (

        <Card
            mode="outlined"
            style={[styles.card, { backgroundColor: colors.backgroundCard, }]}
            accessible
            onPress={(i)=>{alert(infraccio?.articulo)}}
        >
            {infraccio?.norma &&
                <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.norma && infraccio.norma}
                    </Text>
                </Card.Content>
            }
            {infraccio?.titulo_tit &&
                <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.titulo_tit && infraccio.titulo_tit}
                    </Text>
                </Card.Content>
            }
            {infraccio?.capitulo_tit &&
                <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.capitulo_tit && infraccio.capitulo_tit}
                    </Text>
                </Card.Content>
            }
            {
                infraccio?.seccion &&
                <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.seccion && infraccio.seccion}
                    </Text>
                </Card.Content>
            }
            <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentArticle]}>
            <Text style={[styles.title,styles.fontArticle, { color: colors.text }]}>
                {infraccio?.articulo && infraccio.articulo}
            </Text>
            </Card.Content>
            <Card.Content style={[{ borderTopColor: colors.borderHovertileBar }, styles.ContentInfra]}>
                <Text style={[{ marginTop: 10, color: colors.text }, styles.textoInfra]}>
                    {/* {infraccio?.texto && infraccio.texto} */}
                    {infraccio?.texto &&
                        infraccio?.texto.split("##").map((infraccio, idx) => {
                            return (
                                <>
                                    {idx > 0 && <Text>{"\n"}{"\n"}</Text>}
                                    <HighlightText
                                        searchWords={mainKeywords}
                                        highlightStyle={{ color: colors.highLightText, fontWeight: '800' }}
                                        sanitize={standaritzedText}
                                        textToHighlight={infraccio || ""}
                                    />
                                </>
                            )
                        })
                    }
                </Text>
            </Card.Content>
        </Card >
    );
});
const styles = StyleSheet.create({
   
    card: {
        marginTop: 7,
        width: width - 25,
        // borderWidth: 2,
    },  
    contentTitle: {
        marginTop: 0,
        marginBottom: 6,
        borderBottomWidth: 2,
    },
    fontArticle: {          
       fontSize:17,
       fontWeight:'800'
    },
    contentArticle: {          
        marginTop: 0,
        marginBottom:-5
    },
    ContentInfra: {
        borderTopWidth: 2,
        marginTop: 8,
    },
    textoInfra: {
        lineHeight: 22,
        textAlign: 'justify'
    },
    title: {
        fontSize:15,
        fontWeight: 600,
        textTransform: 'capitalize',
        textAlign: 'center',
        marginTop: -4,
        marginBottom: 6,
    },
});

