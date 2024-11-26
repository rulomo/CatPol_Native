import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme } from 'react-native'
import { SwitchButton } from '../../../components/SwitchButton';

export const CodificadosTab = () => {
    const { colors } = useTheme();
    const theme = useColorScheme();

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                { backgroundColor: colors.background }
            ]}
        >
            <View>
            <SwitchButton />
                <Text style={{ fontSize: 16, color: colors.text }}>
                    {`We are working with ${theme} Mode!!`}
                </Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

