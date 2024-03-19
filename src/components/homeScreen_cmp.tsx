import React from "react";
import {homeStyles} from "../screens/HomeScreen";
import {Alert, Modal, Pressable, View, Text, TextInput} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";

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

interface newUserModalProps {
    modalVisible : boolean,
    setModalVisible : (boolean) => void,
    onChangeName : (String) => void,
    onChangeSurname : (String) => void,
}
export const NewUserModal : React.FC<newUserModalProps> = ({ setModalVisible, modalVisible, onChangeSurname, onChangeName } ) => {

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
                    <Text style ={homeStyles.infoLabel}> Veuillez renseignez votre nom et prénom </Text>
                <InfoInput onChangeName ={onChangeName} onChangeSurname ={onChangeSurname}/>
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
