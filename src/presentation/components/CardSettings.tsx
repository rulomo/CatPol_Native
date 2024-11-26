import { useTheme } from '@react-navigation/native';
import React, { Children, FC, ReactNode } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'

interface Props {
    children: JSX.Element | JSX.Element[];
    title?: string;
    footer?: string;
}

export const CardSettings: FC<Props> = ({ children, title,footer }) => {

    const { colors } = useTheme() as unknown as IAppTheme;

    const styles = StyleSheet.create({


        textSmall: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '300'
        },
        textTitles: {
            color: colors.text,
            fontSize: 16,
            marginTop: 20,
            marginLeft: 25,
            fontWeight: 500
        },
        card: {
            backgroundColor: colors.card,
            color: colors.text,
            margin: 10,
            minHeight: 25,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: colors.backGroundTitleBar,
        },
    });

    return (
        <View>
            <Text style={styles.textTitles}>{title}</Text>
            <View style={styles.card}>
                {children}
            </View>
            <Text style={[styles.textSmall, { marginLeft: 17, marginRight: 15 }]}>{footer}</Text>
        </View>
    )
}
