import { FC, memo, useEffect, useState } from "react";
import { ICodiPenal } from "../../interfaces";
import { EstandaritzedArticles, stringToArrayWords, standaritzedText } from "../../utils";
import useInfraccionsContext from "../../contexts/InfraccionsContext";
import { useTheme } from "@react-navigation/native";
import { Dimensions, FlatList, Text, StyleSheet, View } from "react-native"
import { Card } from "react-native-paper";
import HighlightText from "@sanar/react-native-highlight-text";

interface Props {
    infraccio?: ICodiPenal;
}

let { height, width } = Dimensions.get('window');


//Cada parrafo que se pongan el verde las palabras del search
const Parrafo = ({
    infraccio,
    parrafo,
}: {
    infraccio: ICodiPenal;
    parrafo: string;
}) => {
    const { valueSearch } = useSearchContext();

    const [chunks, setChunks] = useState<HighlightWords.Chunk[]>([
        { key: "root", text: "", match: false },
    ]);

    //Para el highlight de las palabras buscadas.
    useEffect(() => {
        setChunks(
            highlightWords({
                text: parrafo || "",
                query:
                    stringToArrayWords(valueSearch, 3)
                        .toString()
                        .replaceAll(",", " ") || "",
            })
        );
    }, [valueSearch, setChunks, parrafo]);

    return (
        <p style={{ marginBottom: "15px", textAlign: "justify" }}>
            {chunks.map(({ key, text, match }) => (
                <span key={key} className={match ? "highlight" : ""}>
                    {text}
                </span>
            ))}
        </p>
    );
};

export const CardInfraccions2: FC<Props> = memo(({ infraccio }) => {

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
            style={[styles.card, { backgroundColor: colors.backgroundCard, }]}
            accessible
        >
            <Card.Content style={[{ borderBottomColor: colors.borderHovertileBar }, styles.contentTitle]}>
                {infraccio?.norma &&
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.norma && infraccio.norma}
                    </Text>}

                {infraccio?.titulo_tit &&
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.titulo_tit && infraccio.titulo_tit}
                    </Text>}
                {infraccio?.capitulo_tit &&
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.capitulo_tit && infraccio.capitulo_tit}
                    </Text>
                }
                {infraccio?.seccion &&
                    <Text style={[styles.title, { color: colors.text }]}>
                        {infraccio?.seccion && infraccio.seccion}
                    </Text>
                }
            </Card.Content>


            <Text style={[styles.title, { color: colors.text }]}>
                {infraccio?.articulo && infraccio.articulo}
            </Text>

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

        /*
        <Card className={styles.card} onClick={handleShow}>
                  <Card.Subtitle
                      className={`mt-1 d-flex justify-content-center px-2 text-center
                  ${infraccio ? "" : `loading`}`}
                  >
                      {`${infraccio?.norma || `Lorem ipsum dolor sit amet`}`}
                  </Card.Subtitle>
                  <hr className="mt-1 mb-1" />
  
                  <Card.Subtitle
                      className={`mt-1 d-flex justify-content-center px-2 text-center
                  ${infraccio ? "" : `loading`}`}
                  >
                      {`${
                          infraccio?.titulo_tit || `----------------------------`
                      }`}
                  </Card.Subtitle>
                  <hr className="mt-1 mb-1" />
  
                  {infraccio?.capitulo_tit && (
                      <>
                          <Card.Subtitle
                              className={`mt-1 d-flex justify-content-center px-2 text-center
                  ${infraccio ? "" : `loading`}`}
                          >
                              {`${
                                  infraccio?.capitulo_tit ||
                                  `Lorem ipsum dolor sit amet`
                              }`}
                          </Card.Subtitle>
                          <hr className="mt-1 mb-1" />
                      </>
                  )}
  
                  {infraccio?.seccion && (
                      <>
                          <Card.Subtitle
                              className={`mt-1 d-flex justify-content-center px-2 text-center
                  ${infraccio ? "" : `loading`}`}
                          >
                              {`${
                                  infraccio?.seccion ||
                                  `Lorem ipsum dolor sit amet`
                              }`}
                          </Card.Subtitle>
                          <hr className="mt-1 mb-1" />
                      </>
                  )}
  
                  <Card.Subtitle
                      className={`mt-1 d-flex justify-content-center px-2 text-center
                  ${infraccio ? "" : `loading`}`}
                  >
                      <h5>{`${
                          infraccio?.articulo || `Lorem ipsum dolor sit amet`
                      }`}</h5>
                  </Card.Subtitle>
                  <hr className="mt-1 mb-1" />
  
                  <Card.Body className={styles[`card-body`]}>
                      <div className={`${infraccio ? "" : `loading`}`}>
                          {infraccio?.texto
                              ? infraccio?.texto
                                    .split("##")
                                    .map((parrafo: string, index: any) => (
                                        <Parrafo
                                            key={`${infraccio.articulo}_${index}`}
                                            infraccio={infraccio}
                                            parrafo={parrafo}
                                        />
                                    ))
                              : `Lorem ipsum dolor sit amet, 
                              consectetur adipisici elit, 
                              sed eiusmod tempor incidunt ut`}
                      </div>
                  </Card.Body>
              </Card>
        */

    );
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

