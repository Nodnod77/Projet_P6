import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { userData } from "../../types/userData";
import HomeScreen from "../../screens/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Activity from "../../screens/activity";
import {StyleSheet} from "react-native";

// Définissez le type des paramètres de la pile
export type StackParamList = {
    HomeScreen: undefined;
    ActivityScreen: {user : userData};
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
    return (
        <NavigationContainer  >
            <Stack.Navigator
                initialRouteName={"HomeScreen"}
                screenOption = {{
                headerTintColor : 'white', //text
                headerStyle : {backgroundColor: '#800636'},
            }}>
                <Stack.Screen
                    name={"HomeScreen"}
                    component={HomeScreen}
                    options={{
                        title: "Accueil" ,
                        headerLeft: () => (
                        <Icon name="home"  style ={styles.iconContainer}/>
                        )
                }}
                />
                <Stack.Screen
                    name={"ActivityScreen"}
                    component={Activity}
                    options={{ title: "Mon activité" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    iconContainer: {
        paddingLeft: '1.5%', //  3% de la taille de la vue
        paddingRight:'10%',
        paddingBottom:'3%',
        paddingTop:"3%",
        margin:'2.5%',
        color: '#2D9BF0',
        fontSize: 30,
    },
});
export default StackNavigator;
