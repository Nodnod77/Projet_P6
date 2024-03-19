import React from "react";
import {homeStyles} from "../screens/HomeScreen";
import {Alert, Modal, Pressable, View, Text, TextInput, TouchableOpacity} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
interface WarningModalProps {
    modalVisible : boolean,
    setWarningModalVisible : (boolean) => void,
}

export const WarningModal : React.FC<WarningModalProps> = ({ setWarningModalVisible, modalVisible }) => {

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
                <View style={homeStyles.homeModalView}>
                    {/*<FontAwesome name="exclamation-circle" style ={styles.iconContainer} />*/}
                    <Text style={{marginBottom: 15, textAlign: 'center', color: 'black', fontSize: RFPercentage(3)}}>Veuillez
                        sélectionner un utilisateur❗</Text>
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
}
export const NewUserModal : React.FC<newUserModalProps> = ({ setModalVisible, modalVisible, onChangeSurname, onChangeName, newSurname, newName } ) => {

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

                <View style={homeStyles.homeModalView}>
                    <TouchableOpacity  style = {homeStyles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
                    <Icon name = "close" style = {homeStyles.closeIcon}></Icon>
                    </TouchableOpacity >
                    <Text style ={homeStyles.mediumTitle}>Création d'un utilisateur ✍️</Text>
                    <Text style ={homeStyles.infoLabel}>Veuillez renseignez votre nom et prénom</Text>
                <InfoInput onChangeName ={onChangeName} onChangeSurname ={onChangeSurname} newName={newName} newSurname={newSurname}/>
                    <Pressable
                        style={[homeStyles.modalButton]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={homeStyles.modalTextStyle}>Valider</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};
