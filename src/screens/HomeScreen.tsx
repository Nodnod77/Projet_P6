import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native';
import {StackParamList} from "../navigation/StackNavigator";
import {StackNavigationProp} from "@react-navigation/stack";
import { Button } from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";


type HomeProps =  NativeStackScreenProps<StackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}:HomeProps) => {
    return (
        <SafeAreaView>
            <Text style = {{fontSize: 30}}>Hello</Text>
            <Button title="click me ! ;))"
                    onPress={()=> navigation.navigate("ActivityScreen", {name: "Matis", surname: "Spinelli"})}/>
        </SafeAreaView>
    );
};
export default  HomeScreen;
