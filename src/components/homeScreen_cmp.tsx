import React, {useState} from "react";
import {homeStyles} from "../screens/HomeScreen";
import {Alert, Modal, Pressable, View, Text, TextInput, TouchableOpacity} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
interface WarningModalProps {
    modalVisible : boolean,
    setWarningModalVisible : (boolean) => void,
    warningLabel : String,
}
import JsonFS from './jsonFS';
import {StackParamList} from "./navigation/StackNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";


interface CustomRadioButtonProps {
    label : String,
    selected : boolean,
    onSelect : ()=> void,
}
export const CustomRadioButton = ({ label , selected, onSelect} : CustomRadioButtonProps) => (
    <TouchableOpacity
        style={[homeStyles.radioButton,
            { backgroundColor: selected ? '#007BFF' : '#FFF' }]}
        onPress={onSelect}
    >
        <Text style={[homeStyles.radioButtonText,
            { color: selected ? '#FFF' : '#000' }]}>
            {label}
        </Text>
    </TouchableOpacity>
);



export const WarningModal : React.FC<WarningModalProps> = ({ setWarningModalVisible, modalVisible,warningLabel }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setWarningModalVisible(!modalVisible);
            }}>
            <View style={homeStyles.modalCenterView}>
                <View style={[homeStyles.homeModalView, homeStyles.warningPadding]}>
                    {/*<FontAwesome name="exclamation-circle" style ={styles.iconContainer} />*/}
                    <Text style={{marginBottom: 15, textAlign: 'center', color: 'black', fontSize: RFPercentage(3)}}>{warningLabel}</Text>
                    <Pressable
                        style={[homeStyles.modalButton]}
                        onPress={() => setWarningModalVisible(!modalVisible)}>
                        <Text style={homeStyles.modalTextStyle}>Fermer</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};



interface infoInputProps {
    onChangeName : (text : String) => void,
    onChangeSurname : (text : String) => void,
    newSurname : String,
    newName : String,
}
 const InfoInput = ({ onChangeName, onChangeSurname, newSurname , newName }: infoInputProps)=> {

    return (
        <View style={homeStyles.row}>
            <View style = {homeStyles.column}>
                <Text style={homeStyles.label}> {"Nom"}</Text>
                <Text style={homeStyles.label}> {"Prénom"}</Text>
            </View>
            <View style = {homeStyles.column}>
                <TextInput placeholder ={"Nom"} style={homeStyles.textInput} onChangeText = {onChangeSurname} value ={newSurname}></TextInput>
                <TextInput placeholder ={"Prénom"} style={homeStyles.textInput} onChangeText = {onChangeName} value = {newName}></TextInput>
            </View>
        </View>
    );
};

interface newUserModalProps {
    modalVisible : boolean,
    setModalVisible : (boolean) => void,
    onChangeName : (String) => void,
    onChangeSurname : (String) => void,
    newName : String,
    newSurname : String,
    setIsReload : (boolean)=> void,


}
export const NewUserModal : React.FC<newUserModalProps> = ({ setModalVisible, modalVisible, onChangeSurname, onChangeName, newSurname, newName,setIsReload } ) => {
    //state de la modal input name et surname
    const [ newUserWarningModalVisible, setNewUserWarningModalVisible] = useState(false);

    function handleCreateUser() {
        if ( newSurname === '' || newSurname ===' ' && newName === '' || newName === ' '){
            setNewUserWarningModalVisible(true);
            return;
        }
        const json = JsonFS.getInstance();

        json.addUser(newName, newSurname).then(r => {setModalVisible(false); setIsReload(true);}); // + faire un .then et set la liste des user
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>

            <View style={homeStyles.modalCenterView}>
                <WarningModal modalVisible={newUserWarningModalVisible} setWarningModalVisible={setNewUserWarningModalVisible} warningLabel={"⚠️ Veuillez indiquer votre nom et prénom ❗"}/>
                <View style={[homeStyles.homeModalView, homeStyles.newUserPadding]}>
                    <TouchableOpacity  style = {homeStyles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
                    <Icon name = "close" style = {homeStyles.closeIcon}></Icon>
                    </TouchableOpacity >
                    <Icon name={ 'user'} style ={{ color : 'black', fontSize : RFPercentage(4)}}></Icon>
                    <Text style ={homeStyles.mediumTitle}>Création d'un utilisateur</Text>
                    <Text style ={homeStyles.infoLabel}>Veuillez renseignez votre nom et prénom</Text>
                <InfoInput onChangeName ={onChangeName} onChangeSurname ={onChangeSurname} newName={newName} newSurname={newSurname}/>
                    <Pressable
                        style={[homeStyles.modalButton]}
                        onPress={handleCreateUser}>
                        <Text style={homeStyles.modalTextStyle}>Valider</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};
