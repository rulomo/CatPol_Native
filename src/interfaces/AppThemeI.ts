
type FontStyle = {
    fontFamily: string;
    fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
};

type IAppTheme = {
    dark: boolean;
    colors: IColors;
    fonts: {
        regular: FontStyle;
        medium: FontStyle;
        bold: FontStyle;
        heavy: FontStyle;
    };
}

type IColors = {
    text: string,
    card: string,
    border: string,
    primary: string,
    background: string,
    
    drawerText: string,
    borderCardActive: string,
    borderCard: string,
    backgroundCard: string,
    greyBorder: string,
    link: string,
    notification: string,
    primaryBlue: string,
    secondaryBlue: string,
    success: string,
    textButton: string,
    borderHovertileBar: string,
    backGroundTitleBar: string,
    borderTitleBar: string,
}