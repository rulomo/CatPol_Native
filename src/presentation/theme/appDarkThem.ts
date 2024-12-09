/**
 * Colores globales de la aplicacion en modo noche 
 */

import { DefaultTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

const WEB_FONT_STACK =
    'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const AppDarkTheme: IAppTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        text: '#f0f0f0',
        card: '#313131',       //old #50504c
        border: '#f0f0f0',
        primary: '#f0f0f0',
        background: '#222',//old #696963        
        drawerText: '#f0f0f0ad',
        borderCardActive: '#313131',
        borderCard: '#444',
        backgroundCard: '#50504c',
        borderHovertileBar: '#8a8a8a',
        backGroundTitleBar: 'grey',
        borderTitleBar: '#1d1d1b',
        greyBorder: '#d1d1d1r',
        link: '#4a90e2',
        notification: '#FF453A',
        primaryBlue: '#2196F3',
        secondaryBlue: '#135b96',
        success: '#15fa00',
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

export default AppDarkTheme;
