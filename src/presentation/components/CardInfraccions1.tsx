import { FC, memo } from "react";
import { Dimensions, FlatList, Text, StyleSheet, View } from "react-native"

import useInfraccionsContext from "../../contexts/InfraccionsContext";

import { ICodificats, OrdenancaStandard } from "../../interfaces";
import { EstandaritzedArticles,standaritzedText, stringToArrayWords } from "../../utils";
import { Card } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import HighlightText from "@sanar/react-native-highlight-text";


interface Props {
    infraccio?: OrdenancaStandard;
}

let { height, width } = Dimensions.get('window');

export const CardInfraccions1: FC<Props> = memo(({ infraccio }) => {

    const { state, dispatch } = useInfraccionsContext();

    const { colors } = useTheme() as unknown as IAppTheme;


    const { infraccionsToShow: infraccions, currentCodificat, lastSearch } = state;

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => {
    //     !window?.getSelection()?.toString() && setShow(true);
    // }

    let fields = [];
    let numRows = 0;

    if (currentCodificat) {
        for (let i = 1; i < 10; i++) {
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
            style={[styles.card, { backgroundColor: colors.backgroundCard, }]}
            accessible
        >
            <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {infraccio?.norma && infraccio.norma}
                </Text>
            </Card.Content>
            <Card.Content style={styles.contentMiddle}>
                <View style={styles.twoColumns}>
                    <Text style={[styles.middleText, { color: colors.text }]}>
                        {infraccio && fields[0].field &&
                            `${fields[0]?.label}: ${EstandaritzedArticles(infraccio?.articulo, infraccio?.apartado, infraccio?.opcion)}`}
                    </Text>
                    <Text style={[styles.middleText, { color: colors.text }]}>
                        {infraccio && fields[1]?.field &&
                            `${fields[1].label}: ${fields[1]?.field
                                ? infraccio[`${fields[1]?.field}`] : ""
                            }`}
                    </Text>
                </View>
                <View style={styles.twoColumns}>
                    <Text style={[styles.middleText, { color: colors.text }]}>
                        {infraccio && fields[2]?.field &&
                            `${fields[2].label}: ${fields[2]?.field
                                ? infraccio[`${fields[2]?.field}`] : ""
                            }`}
                    </Text>
                    <Text style={[styles.middleText, { color: colors.text }]}>
                        {infraccio && fields[3]?.field &&
                            `${fields[3].label}: ${fields[3]?.field
                                ? infraccio[`${fields[3]?.field}`] : ""
                            }`}
                    </Text>
                </View>
            </Card.Content>
            <Card.Content style={[{ borderTopColor: colors.borderHovertileBar }, styles.ContentInfra]}>
                <Text style={[{ marginTop: 10, color: colors.text }, styles.textoInfra]}>
                    {/* {infraccio?.texto && infraccio.texto} */}
                    <HighlightText                        
                        searchWords={mainKeywords}
                        highlightStyle={{color:colors.highLightText,fontWeight:'800'}} 
                        sanitize ={standaritzedText}                        
                        textToHighlight={infraccio?.texto || ""}                        
                    />
                </Text>
            </Card.Content>
        </Card >
    );




    //         <Modal
    //             show={show}
    //             onHide={handleClose}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //             style={{ color: "white", zIndex: "10000" }}
    //         >
    //             <Modal.Header closeButton className="text-center">
    //                 <Modal.Title>{infraccio?.norma}</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <table>
    //                     <tbody>
    //                         {rows_modal?.length &&
    //                             rows_modal.map((row: string) => {
    //                                 const campos: string[] = row.split(",");
    //                                 if (
    //                                     infraccio &&
    //                                     infraccio[
    //                                     `${campos[1] as keyof typeof infraccio}`
    //                                     ]
    //                                 )
    //                                     return (
    //                                         <tr key={campos[1]}>
    //                                             <th
    //                                                 style={{
    //                                                     minWidth: "125px",
    //                                                     verticalAlign: "top",
    //                                                 }}
    //                                             >{`${campos[0]}:`}</th>
    //                                             <td>{` ${infraccio[
    //                                                 `${campos[1] as keyof typeof infraccio
    //                                                 }`
    //                                             ]
    //                                                 }`}</td>
    //                                         </tr>
    //                                     );
    //                             })}
    //                         <br />
    //                         <tr>
    //                             <th>Link:</th>
    //                             <td><a
    //                                 target="_blank"
    //                                 href={`${currentCodificat?.ELI}`}
    //                                 style={{
    //                                     overflow: "hidden",
    //                                     display: "inline-block",
    //                                     textOverflow: "ellipsis",
    //                                     width: "50vw"
    //                                 }}
    //                             >
    //                                 {currentCodificat?.ELI}
    //                             </a>
    //                             </td>
    //                         </tr>                            
    //                         <tr>
    //                             <th>Norma:</th>
    //                             <td>{currentCodificat?.normal_name}</td>
    //                         </tr>                            
    //                         <tr>
    //                             <th>Actualitzat:</th>
    //                             <td>{new Date(currentCodificat?.last_update).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
    //                         </tr>

    //                     </tbody>
    //                 </table>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={handleClose}>
    //                     Tancar
    //                 </Button>
    //                 {/* <Button variant="primary" onClick={handleClose}>
    //                     Save Changes
    //                 </Button> */}
    //             </Modal.Footer>
    //         </Modal>
    //     </>
    // );



});
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


// alert(addDaysToDate(new Date(), 5).toLocaleDateString("ES-es", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
