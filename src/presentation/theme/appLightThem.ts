/**
 * Colores globales de la aplicacion en modo dia 
 */

import { DefaultTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

const WEB_FONT_STACK =
    'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const AppLightTheme: IAppTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        text: '#000',
        card: '#f9f9f9',
        border: '#9F9F9F',
        primary: '#333333',
        background: '#fff',

        drawerText: '#353333ad',
        borderCardActive: '#313131',
        borderCard: '#eee',
        backgroundCard: '#50504c',
        greyBorder: '#d1d1d1',
        borderHovertileBar: '#8a8a8a',
        backGroundTitleBar: 'grey',
        borderTitleBar: '#1d1d1b',
        link: '#4a90e2',
        notification: '#FF453A',
        primaryBlue: '#3D5AFE',
        secondaryBlue: '#135b96',
        success: '#17977a',
        textButton: '#fff',
    },
    fonts: Platform.select({
        web: {
            regular: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '400',
            },
            medium: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '500',
            },
            bold: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '600',
            },
            heavy: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '700',
            },
        },
        ios: {
            regular: {
                fontFamily: 'System',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'System',
                fontWeight: '500',
            },
            bold: {
                fontFamily: 'System',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'System',
                fontWeight: '700',
            },
        },
        default: {
            regular: {
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'sans-serif-medium',
                fontWeight: 'normal',
            },
            bold: {
                fontFamily: 'sans-serif',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'sans-serif',
                fontWeight: '700',
            },
        },
    }),
}

export default AppLightTheme;
