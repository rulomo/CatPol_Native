import React from 'react'
import { View, Text } from 'react-native'

export const SwitchThemes = () => {
    return (
        <>
            <Text style={styles.textTitles}>Tema</Text>
            <View style={styles.card}>
                <RadioButton.Group onValueChange={newValue => (
                    Appearance.setColorScheme(newValue as ColorSchemeName),
                    setValue(newValue)
                )
                }
                    value={value}>
                    <View style={styles.radioGroup} >
                        <View style={styles.radioGroup}>
                            <MaterialCommunityIcons
                                name='theme-light-dark'
                                size={18}
                                color={colors.text}
                            // style={{...styles.iconStyle}} 
                            />
                            <Text style={styles.textRadio}>Automàtic</Text>
                        </View>
                        <RadioButton value="auto" />
                    </View>
                    <View style={styles.radioGroup} >
                        <View style={styles.radioGroup}>
                            <MaterialCommunityIcons
                                name='white-balance-sunny'
                                size={18}
                                color={colors.text}
                            // style={{...styles.iconStyle}} 
                            />
                            <Text style={styles.textRadio}>Light</Text>
                        </View>
                        <RadioButton value="light" />
                    </View>
                    <View style={styles.radioGroup} >
                        <View style={styles.radioGroup}>
                            <MaterialCommunityIcons
                                name='moon-waning-crescent'
                                size={18}
                                color={colors.text}
                            // style={{...styles.iconStyle}} 
                            />
                            <Text style={styles.textRadio}>Dark</Text>
                        </View>
                        <RadioButton value="dark" />
                    </View>
                </RadioButton.Group>

            </View>
            <Text style={styles.textSmall}>Automàtic només és compatible amb sistemes operatius que us permeten controlar la combinació de colors a tot el sistema.</Text>
        </>
    )
}
