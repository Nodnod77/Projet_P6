import React from 'react';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import {Text} from 'react-native';
import {StackParamList} from "../components/navigation/StackNavigator";
import {StackNavigationProp} from "@react-navigation/stack";
import { Button } from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {userData} from "../types/userData";
import ResponsiveFontSize from 'react-native-responsive-fontsize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




type HomeProps =  NativeStackScreenProps<StackParamList, 'HomeScreen'>;

const testUser : userData = {
    name : "testname",
    surname : "testsurname"
}
interface infoInputProps {
    onChangeName : (text : String) => void,
    onChangeSurname : (text : String) => void,

}
const InfoInput = ({ onChangeName, onChangeSurname }: infoInputProps)=> {

    return (
        <View style={homeStyles.row}>
            <View style = {homeStyles.column}>
                <Text style={homeStyles.label}> {"Nom"}</Text>
                <Text style={homeStyles.label}> {"Prénom"}</Text>
            </View>
            <View style = {homeStyles.column}>
                <TextInput placeholder ={"Nom"} style={homeStyles.textInput} onChangeText = {onChangeSurname}></TextInput>
                <TextInput placeholder ={"Prénom"} style={homeStyles.textInput} onChangeText = {onChangeName}></TextInput>
            </View>
        </View>
        );
    };


const HomeScreen = ({navigation}:HomeProps) => {
    const [ name , onChangeName] = React.useState('')
    const [ surname , onChangeSurname] = React.useState('')

    const handleStartActivity = () => {
        if (name == '' || name == ' '){

        }
        const userData: userData = {
            name: name,
            surname: surname,
        };


        navigation.navigate("ActivityScreen", {user: userData});
    };
    return (
        <SafeAreaView style = {homeStyles.screen}>

                {/*<View>*/}

            <Text style = {homeStyles.title}>Bienvenue ! 🎈</Text>
                {/*<Text style ={homeStyles.infoLabel}> Veuillez renseignez votre nom et prénom </Text>
            </View>
            <InfoInput onChangeName ={onChangeName} onChangeSurname ={onChangeSurname}/>*/}
            <View style = {homeStyles.list}>
            <FlatList data={[
                {key: 'Devin'},
                {key: 'Dan'},
                {key: 'Dominic'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Juli'},

            ]}
                      renderItem={({item}) =><Text style={homeStyles.itemList}>{item.key}</Text>}>
            </FlatList>
            </View>
            <TouchableOpacity onPress={()=>handleStartActivity()} style={homeStyles.button}>
                <Text style={homeStyles.buttonText}> 🚀 Démarrer une activité</Text>
            </TouchableOpacity>

        </SafeAreaView>

    );
};

const homeStyles = StyleSheet.create({
    screen : {
        backgroundColor: 'white', flex:1
    },
    itemList: {
        fontSize: RFPercentage(3),
        height: RFPercentage(5),
        color : 'black',
        marginLeft : RFPercentage (3),
        marginBottom: RFPercentage(1),
    },
    title:{
        fontSize : RFPercentage(6),
        color: 'black',
        fontWeight: 'bold',
        margin : '10%',
    },
    list :{
        paddingVertical: RFPercentage (3),
        backgroundColor : '#dde7ef',
        height: '50%',
    },
    column :{
        flexDirection: 'column',

    },
    row : {
        flexDirection : 'row',
        margin: RFPercentage(5),

    },
    textInput : {
        // flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius:11,
        padding: RFPercentage(1),
        paddingRight:RFPercentage(15),
        margin : RFPercentage(0.5)
    },
    label :{
        marginRight: RFPercentage (2),
        fontSize: RFPercentage(3),
        color : "black",
        padding : RFPercentage(1),
        paddingBottom :RFPercentage(3),
        paddingRight: RFPercentage(3),
        paddingTop : RFPercentage(1),
    },
    infoLabel :{
        fontSize : RFPercentage(2.3),
        margin : '5%',
        color : 'black',
    },
    button: {
        marginTop: RFPercentage(5),
        backgroundColor: '#2D9BF0',
        padding: RFPercentage(2),
        borderRadius: 10,
        alignSelf: 'center',
        boxShadow: 10,

    },
    buttonText :{
        color : "white",
        padding: RFPercentage (1),
        fontSize: RFPercentage (3.5),
        marginRight: RFPercentage(1),

    }

})
export default  HomeScreen;
