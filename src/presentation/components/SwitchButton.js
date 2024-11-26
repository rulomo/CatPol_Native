
import {  useState } from "react";
import { Appearance, Switch, View } from "react-native";


export const SwitchButton = () => {


    const [isEnabled, setIsEnabled] = useState(false);
    
    const toggleSwitch = () => {
        setIsEnabled(prevState => !prevState);
        Appearance.setColorScheme(isEnabled ? 'dark' : 'light');
    };
    
    return (
        <View style={{ marginTop: 50 }}>
            <Switch
                value={isEnabled}
                onValueChange={()=>toggleSwitch()}
                // disabled={colorScheme === 'dark'}
                
            />
        </View>
    );
}
