import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackHeaderProps} from "@react-navigation/native-stack";
import { userData } from "../../types/dataTypes";
import HomeScreen from "../../screens/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import Activity from "../../screens/activity";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";

// Définissez le type des paramètres de la pile
export type StackParamList = {
    HomeScreen: undefined;
    ActivityScreen: {user : userData};
};

const Stack = createNativeStackNavigator<StackParamList>();

const Header = (props: NativeStackHeaderProps) => {
    if(props.options.headerLeft == undefined) return <View></View>

    return (
        <View style={{
            backgroundColor: "#2D9BF0",
            height: RFPercentage(10),
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Pressable onTouchEnd={() => props.navigation.navigate("HomeScreen")} style={{
                paddingLeft: '1.5%', //  3% de la taille de la vue
                paddingRight:'10%',
                margin:'2.5%',
            }}>
                {props.options.headerLeft({canGoBack: true})}
            </Pressable>
            <Text style={{
                color: "white",
                fontSize: RFPercentage(4)
            }}>{props.options.title}</Text>
        </View>
    )
}

const StackNavigator = () => {
    return (
        <NavigationContainer  >
            <Stack.Navigator
                initialRouteName={"HomeScreen"}
                screenOptions = {{
                    headerTintColor : 'white', //text
                    headerStyle : {backgroundColor: '#2D9BF0'},
                }}
            >
                <Stack.Screen
                    name={"HomeScreen"}
                    component={HomeScreen}
                    options={{
                        title: "Accueil" ,
                        headerLeft: () => <Icon name="home"  style ={{
                            color: "white",
                            fontSize: RFPercentage(5)
                        }}/>,
                        header: Header
                }}
                />
                <Stack.Screen
                    name={"ActivityScreen"}
                    component={Activity}
                    options={{
                        title: "Mon activité",
                        headerLeft: () => <Icon name="arrow-left" style={{
                            color: "white", fontSize: RFPercentage(4)
                        }}/>,
                        header: Header,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default StackNavigator;
