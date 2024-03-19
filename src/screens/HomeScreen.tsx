import React, {useState} from 'react';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView, Alert, Modal
} from 'react-native';
import {Text} from 'react-native';
import {StackParamList} from "../components/navigation/StackNavigator";

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {userData} from "../types/dataTypes";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
import {CrudButton, CustomRadioButton, NewUserModal, WarningModal} from "../components/homeScreen_cmp";
import JsonFS from "../components/jsonFS";



interface HomeProps  {
    navigation : NativeStackScreenProps<StackParamList, 'HomeScreen'>,
};





const HomeScreen = ({navigation}:HomeProps) => {
    // state nom et prénom sélectionner dans la liste
    const [ name , setName] = React.useState('')
    const [ surname , setSurname] = React.useState('')
    // state des input lors de la creation d'un user
    const [ newName , setNewName] = React.useState('')
    const [ newSurname , setNewSurname] = React.useState('')
    const [modalVisible, setWarningModalVisible] = useState(false);
    const [newUserModalVisible, setNewUserModalVisible] = useState(false);
    const [ deleteUser, setDeleteUser] = useState(false);
    const [userTab , setUserTab] = useState([]);
    const [isReload, setIsReload] = useState(false);

    function  initUser() {
        const json = JsonFS.getInstance();
        JsonFS.waitForLoad().then(() => setUserTab(json.config.utilisateurs))
        console.log('initiTab2: ', json.config.utilisateurs);
    }
    initUser();

    if (isReload){
        console.log('reload !')
        initUser ();
        setIsReload(false);
        setNewName("");
        setNewSurname("");
    }

    const handleStartActivity = () => {
        if ( name == '' || surname ==''){
            setWarningModalVisible(true);
            return;
        }
        // c'est l'utilisateur selectionner
        const userData: userData = {
            prenom: name,
            nom: surname,
        };
        navigation.navigate("ActivityScreen", {user: userData});
    };
    return (
        <SafeAreaView style = {homeStyles.screen}>

            <CrudButton setModalVisible={setNewUserModalVisible} iconName={"plus"} textButton={'Créer un utilisateur'}/>
            <CrudButton setModalVisible={setDeleteUser} iconName={"delete"} textButton={'Supprimer un utilisateur'}/>

            <NewUserModal modalVisible={newUserModalVisible} onChangeSurname={setNewSurname} onChangeName={setNewName} setModalVisible={setNewUserModalVisible} newSurname={newSurname} newName={newName} setIsReload={setIsReload}   />
            <Text style = {homeStyles.title}>Bienvenue ! 🎈</Text>

            <Text style ={homeStyles.text}> Sélectionnez un utilisateur :</Text>
            <View style = {homeStyles.list}>
                <FlatList
                    data={userTab}
                    renderItem={({ item }) => (
                        <CustomRadioButton
                            label={item.prenom + ' ' + item.nom}
                            selected={ name === item.prenom && surname === item.nom}
                            onSelect={() => {setName (item.prenom), setSurname (item.nom)}}
                            deleteUser={}
                        />
                    )}
                    keyExtractor={(item) => item.prenom + item.nom}
                />
            </View>
            <WarningModal setWarningModalVisible={setWarningModalVisible} modalVisible={modalVisible} warningLabel={"Veuillez sélectionner un utilisateur❗"}/>
            <TouchableOpacity onPress={()=>handleStartActivity()} style={homeStyles.button}>
                <Text style={homeStyles.buttonText}> 🚀 Démarrer une activité</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

export const homeStyles = StyleSheet.create({
    screen : {
        backgroundColor: 'white', flex:1
    },
    title:{
        fontSize : RFPercentage(6),
        color: 'black',
        fontWeight: 'bold',
        margin : '5%',
        marginBottom : '4%'
    },
    list :{
        //justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(45,155,240,0.52)',
        height: '43%',
        width: '60%',
        paddingVertical: RFPercentage(2),
        padding: RFPercentage (3),
        borderRadius : RFPercentage (5),
    },
    column :{
        flexDirection: 'column',
        width : 'fit-content',

    },
    row : {
        flexDirection : 'row',
        marginHorizontal: RFPercentage(2),
        marginTop : RFPercentage (2),

    },
    textInput : {
        width : RFPercentage(15),
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius:11,
        padding: RFPercentage(1),
        margin : RFPercentage(0.5),
        fontSize : RFPercentage (2)
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
    text :{
        fontSize : RFPercentage(2.3),
        margin : '5%',
        color : '#797272',
    },

    button: {
        marginTop: RFPercentage(5),
        backgroundColor: '#2D9BF0',
        padding: RFPercentage(2),
        borderRadius: 10,
        alignSelf: 'center',


    },
    buttonText :{
        color : "white",
        padding: RFPercentage (1),
        fontSize: RFPercentage (3.5),
        marginRight: RFPercentage(1),

    },
    radioButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#2D9BF0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
    },
    radioButtonText: {
        fontSize: RFPercentage (2),
    },
    modalButton: {
        borderRadius: RFPercentage (2.5),
        padding: RFPercentage(2),
        elevation: RFPercentage(0.5),
        backgroundColor : '#be2c54',
        marginTop: RFPercentage (4),
    },
    modalCenterView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTextStyle: {
        color : 'white',
        fontSize : RFPercentage (3),
    },
    newUserTextStyle: {
        color : 'white',
        fontSize : RFPercentage (2),
    },
    homeModalView: {
        backgroundColor: 'white',
        borderRadius: RFPercentage (3),
        padding: RFPercentage(2),
        alignItems: 'center',
        shadowColor: '#be2c54',
        shadowRadius: RFPercentage (4),
        elevation: RFPercentage(2),
    },
    warningPadding :{
       padding:RFPercentage(5),
    },
    newUserPadding :{
        paddingBottom : RFPercentage (5),
    },
    newUserButton :{
        borderRadius: RFPercentage (2.5),
        padding: RFPercentage(2),
        elevation: RFPercentage(0.5),
        backgroundColor : '#be2c54',
        marginTop: RFPercentage (2),
        marginHorizontal: RFPercentage(2),
        width : 'fit-content'
    },
    closeIcon :
        {
            fontSize : RFPercentage (4),
        },
    buttonClose :
        {
            flexDirection : 'row',
            alignSelf : 'flex-end',
        },
    mediumTitle :{
        fontWeight: 'bold',
        fontSize : RFPercentage(3),
        color : 'black'
    }


})
export default  HomeScreen;
