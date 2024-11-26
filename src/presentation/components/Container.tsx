import React, { Children, FC, ReactNode } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'

interface Props {
    children: JSX.Element| JSX.Element[];
    title?: string;
}

export const Container: FC<Props> = ({ children }) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {children}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
})
