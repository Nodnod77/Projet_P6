import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserData } from "../types/userData";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/Activity";
import Activity from "../screens/Activity";

// Définissez le type des paramètres de la pile
export type StackParamList = {
    HomeScreen: undefined;
    ActivityScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: "Accueil" }}
                />
                <Stack.Screen
                    name="ActivityScreen"
                    component={Activity}
                    options={{ title: "Mon activité" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
