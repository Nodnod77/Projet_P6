import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackHeaderProps} from "@react-navigation/native-stack";
import { userData } from "../../types/dataTypes";
import HomeScreen from "../../screens/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import Activity, {ActivityContext} from "../../screens/activity";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import {useContext, useEffect} from "react";
import {useActivity} from "../context";
import ActivityScreen from "../../screens/activity";

// Définissez le type des paramètres de la pile
export type StackParamList = {
    HomeScreen: undefined;
    ActivityScreen: {user : userData};
};

const Stack = createNativeStackNavigator<StackParamList>();

const Header = (props: NativeStackHeaderProps) => {
    const start = useActivity();
    /*useEffect(() => {
    }, [start.started]);*/
    if(props.options.headerLeft == undefined) return <View></View>

    console.log("-------START :",start);

    if (start.started){
        console.log('trueee')
    }
    return (
        <View style={{
            backgroundColor: "#2D9BF0",
            height: RFPercentage(10),
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Pressable onTouchEnd={ start.started?()=>{} :() => props.navigation.navigate("HomeScreen")} style={{
                paddingLeft: '1.5%',
                paddingRight:'10%',
                margin:'2.5%',
            }}>
                { props.options.headerLeft({canGoBack: true})}
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
                    component={ActivityScreen}
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
