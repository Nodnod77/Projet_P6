import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackHeaderProps} from "@react-navigation/native-stack";
import { userData } from "../../types/dataTypes.ts";
import HomeScreen, {homeStyles} from "../../screens/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Pressable, SafeAreaView, Text, View} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import {ActivityProvider, useActivity} from "../context";
import ActivityScreen from "../../screens/activity";
import {useState} from "react";
import {WarningModal} from "../homeScreen_cmp";

// Définissez le type des paramètres de la pile
export type StackParamList = {
    HomeScreen: undefined;
    ActivityScreen: {user : userData};
};

const Stack = createNativeStackNavigator<StackParamList>();

const Header = (props: NativeStackHeaderProps) => {
    const { started } = useActivity();
    const [warningModalVisible, setWarningModalVisible] = useState(false);

    if (props.options.headerLeft == undefined) return <View></View>;


    return (
        <View style={{
            backgroundColor: "#2D9BF0",
            height: RFPercentage(10),
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Pressable
                onPress={started ? ()=>{setWarningModalVisible(true)} : () => props.navigation.navigate("HomeScreen")}
                style={{
                    paddingLeft: '1.5%',
                    paddingRight: '10%',
                    margin: '2.5%',
                }}
            >
                {props.options.headerLeft({canGoBack: !started})}
            </Pressable>
            <Text style={{
                color: "white",
                fontSize: RFPercentage(4)
            }}>{props.options.title}</Text>


            {warningModalVisible && (
                <SafeAreaView style={homeStyles.screen}>
                    <WarningModal
                        setWarningModalVisible={setWarningModalVisible}
                        modalVisible={warningModalVisible}
                        warningLabel={"Veuillez annuler ou finir l'activité pour revenir en arrière"}
                    />
                </SafeAreaView>
            )}
        </View>
    );
}



const StackNavigatorComp = () => {
    const {started, } = useActivity()

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
                        //headerBackVisible: !started,
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

// Needed to disable back button when the activity is started
// Could be refactored in a more intuitive way ?
const StackNavigator = () => {
    return (
        <ActivityProvider>
            <StackNavigatorComp />
        </ActivityProvider>
    );
}

export default StackNavigator;
