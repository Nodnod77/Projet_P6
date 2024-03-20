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
    const [ isDeleteConfirm , setIsDeleteConfirm] = useState(false);
    const [ userToDelete, setUserToDelete] = useState<userData[]>([]);
    function  initUser() {
        const json = JsonFS.getInstance();
        JsonFS.waitForLoad().then(() => setUserTab(json.config.utilisateurs))
        console.log('initiTab2: ', json.config.utilisateurs +"   deleteUser:" , deleteUser);
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

    const handleConfirmDelete = ()=>{

    }
    return (
        <SafeAreaView style = {homeStyles.screen}>
                <View style={{display: deleteUser ? 'none' : 'content'}}>
                <CrudButton setState={setNewUserModalVisible} iconName={"plus"} textButton={'Créer un utilisateur'} state={newUserModalVisible} buttonStyle={homeStyles.newUserButton} textStyle={homeStyles.newUserTextStyle} iconStyle={homeStyles.newUserIcon}/>
                </View>
                <View style={{display: deleteUser ?  'none':'content' }} >
                    <CrudButton setState={setDeleteUser} state={deleteUser} iconName={"trash"} textButton={'Supprimer \n'+'un utilisateur'} buttonStyle={homeStyles.deleteUserButton} textStyle={homeStyles.deleteTextButton} iconStyle={homeStyles.deleteUserIcon}/>
                </View>

                <View style={{display: deleteUser ? 'content' : 'none'}}>
                <CrudButton setState={setIsDeleteConfirm} iconName={"check"} textButton={'Confirmer la suppression'} state={newUserModalVisible} buttonStyle={homeStyles.newUserButton} textStyle={homeStyles.newUserTextStyle} iconStyle={homeStyles.newUserIcon}/>
                </View>
                <View style={{display: deleteUser ? 'content' : 'none'}} >
                    <CrudButton setState={setDeleteUser} state={deleteUser} iconName={"remove"} textButton={'Annulé la suppression'} buttonStyle={homeStyles.deleteUserButton} textStyle={homeStyles.deleteTextButton} iconStyle={homeStyles.deleteUserIcon}/>
                </View>



            <NewUserModal modalVisible={newUserModalVisible} onChangeSurname={setNewSurname} onChangeName={setNewName} setModalVisible={setNewUserModalVisible} newSurname={newSurname} newName={newName} setIsReload={setIsReload}   />
            <Text style = {homeStyles.title}>Bienvenue ! 🎈</Text>

            <Text style ={homeStyles.text}> Sélectionnez un utilisateur :</Text>
            <View style = {homeStyles.list}>
                <FlatList
                    data={userTab}
                    renderItem={({ item }) => (
                        (deleteUser? <CustomRadioButton
                                label={item.prenom + ' ' + item.nom}
                                selected={userToDelete.includes(item) }
                                onSelect={() => userToDelete.push({prenom: item.prenom, nom: item.nom})}
                                deleteUser={deleteUser}
                            />:
                        <CustomRadioButton
                            label={item.prenom + ' ' + item.nom}
                            selected={ name === item.prenom && surname === item.nom}
                            onSelect={() => {setName (item.prenom), setSurname (item.nom)}}
                            deleteUser={deleteUser}
                        />)
                    )}
                    keyExtractor={(item) => item.prenom + item.nom}
                />
            </View>
            <WarningModal setWarningModalVisible={setWarningModalVisible} modalVisible={modalVisible} warningLabel={"Veuillez sélectionner un utilisateur❗"}/>
            <TouchableOpacity onPress={ deleteUser ? ()=> {} : ()=>handleStartActivity()} style={homeStyles.button}>
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
        marginVertical : '3%',
        marginHorizontal : '5%'

    },
    list :{
        //justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(45,155,240,0.52)',
        height: '37%',
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
        marginTop : '1%',
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
        padding: RFPercentage(2.4),
        elevation: RFPercentage(0.5),
        backgroundColor : '#be2c54',
        marginTop: RFPercentage (2),
        marginHorizontal: RFPercentage(2),
        width : 'fit-content'
    },
    deleteUserButton:{
        borderRadius: RFPercentage (1),
        padding: RFPercentage(1),
        //elevation: RFPercentage(2),
        backgroundColor : 'rgba(252,0,0,0.72)',
        marginTop: RFPercentage (1),
        marginHorizontal: RFPercentage(3),
        width : 'fit-content',
    },
    deleteTextButton :{
        fontSize :RFPercentage(1.3),
        color : 'white',
        paddingLeft:RFPercentage(0.5),
    },
    cancelTextButton :{
        fontSize :RFPercentage(1),
        fontWeight: 'bold',
    },
    newUserIcon :{
        color: 'white', fontSize: RFPercentage(2.5), paddingHorizontal: RFPercentage(1)
    },
    deleteUserIcon :{color: 'white', fontSize: RFPercentage(1.9), paddingRight: RFPercentage(0.5) , paddingLeft: RFPercentage(0.2)},
    closeIcon : {
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
