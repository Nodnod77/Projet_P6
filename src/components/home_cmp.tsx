import React, {useState} from "react";
import {homeStyles} from "../screens/HomeScreen";
import {Pressable, View, Text, TextInput, TouchableOpacity, StyleProp, ViewStyle} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
interface WarningModalProps {
    modalVisible : boolean,
    setWarningModalVisible : (arg0: boolean) => void,
    warningLabel : string,
}
import JsonFS from './json_file_system.ts';
import {Common_modal} from "./common_modal.tsx";


interface CustomRadioButtonProps {
    label : string,
    selected : boolean,
    onSelect : ()=> void,
    deleteUser : boolean,
}
export const CustomRadioButton = ({ label , selected, onSelect, deleteUser} : CustomRadioButtonProps) => (
    <TouchableOpacity
        style={[
            homeStyles.radioButton,
            {
                backgroundColor: deleteUser && selected ? 'rgba(252,0,0,0.72)' : (!deleteUser && selected ? '#007BFF' : '#FFF'),
                borderColor: deleteUser && selected ? 'rgba(252,0,0,0.72)' : (!deleteUser && selected ? '#007BFF' : '#FFF'),
            }
        ]}

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
        <Common_modal modalVisible={modalVisible} setModalVisible={setWarningModalVisible} modalViewStyle={{width: RFPercentage(43), padding : RFPercentage(4)}}>

            <Icon name="warning" style={{color: '#be2c54', fontSize: RFPercentage(4)}}></Icon>
            <Text style={{marginBottom: 15, textAlign: 'center', color: 'black', fontSize: RFPercentage(3)}}>{warningLabel}</Text>
            <Pressable
                style={[homeStyles.modalButton]}
                onPress={() => setWarningModalVisible(!modalVisible)}>
                <Text style={homeStyles.modalTextStyle}>Fermer</Text>
            </Pressable>
        </Common_modal>
    );
};



interface infoInputProps {
    onChangeName : (text : string) => void,
    onChangeSurname : (text : string) => void,
    newSurname : string,
    newName : string,
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
    setModalVisible : (arg0: boolean) => void,
    onChangeName : (arg0: string) => void,
    onChangeSurname : (arg0: string) => void,
    newName : string,
    newSurname : string,
    setIsReload : (arg0: boolean)=> void,
}
export const NewUserModal : React.FC<newUserModalProps> = ({ setModalVisible, modalVisible, onChangeSurname, onChangeName, newSurname, newName,setIsReload } ) => {
    //state de la modal input name et surname
    const [newUserWarningModalVisible, setNewUserWarningModalVisible] = useState(false);
    const [warningUserExist, setWarningUserExist] = useState(false);

    function handleCreateUser() {
        if ( newName == '' || newName == ' ' || newSurname === '' || newSurname === ' ' ) {
            setNewUserWarningModalVisible(true);
            return;
        }
        const json = JsonFS.getInstance();
        if (json.config.utilisateurs.some(user => user.prenom === newName && user.nom === newSurname)){
            setWarningUserExist(true);
            return;
        }
        json.addUser(newName, newSurname).then(() => {
            setModalVisible(false);
            setIsReload(true);
        });
    }

    return (
        <Common_modal modalVisible={modalVisible} setModalVisible={setModalVisible} >
            <WarningModal modalVisible={newUserWarningModalVisible}
                          setWarningModalVisible={setNewUserWarningModalVisible}
                          warningLabel={"Veuillez indiquer votre nom et prénom ❗"}/>
            <WarningModal modalVisible={warningUserExist}
                          setWarningModalVisible={setWarningUserExist}
                          warningLabel={"Cet utilisateur existe déjà ❗"}/>
            <TouchableOpacity style={homeStyles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="close" style={homeStyles.closeIcon}></Icon>
            </TouchableOpacity>
            <Icon name={'user'} style={{color: 'black', fontSize: RFPercentage(4)}}></Icon>
            <Text style={homeStyles.mediumTitle}>Création d'un utilisateur</Text>
            <Text style={homeStyles.infoLabel}>Veuillez renseignez votre nom et prénom</Text>
            <InfoInput onChangeName={onChangeName} onChangeSurname={onChangeSurname} newName={newName}
                       newSurname={newSurname}/>
            <Pressable
                style={[homeStyles.modalButton, {marginBottom: RFPercentage(3)}]}
                onPress={handleCreateUser}>
                <Text style={homeStyles.modalTextStyle}>Valider</Text>
            </Pressable>
        </Common_modal>
    );
}
    interface crudButtonProps {
        setState : (arg0: boolean) => void,
        iconName : string,
        textButton : string,
        state : boolean,
        buttonStyle : StyleProp<ViewStyle>,
        textStyle :StyleProp<ViewStyle>
        iconStyle : StyleProp<ViewStyle>
    }
export const CrudButton = ({setState, iconName,  textButton, state, buttonStyle, textStyle, iconStyle}: crudButtonProps) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => setState(!state)} style={ buttonStyle}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={iconName} style={iconStyle}></Icon>
                    <Text style={textStyle}> {textButton} </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
