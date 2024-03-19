import {modalStyles} from "../styles/modalStyles.ts";
import React from "react";
import {Modal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";


const ExitModal = ({setModalVisible}: any): React.JSX.Element => {
    return <TouchableOpacity
        style={modalStyles.exitModal}
        onPress={() => {
            setModalVisible(false)
        }}>
    </TouchableOpacity>
}

interface CommonModalProps {
    modalVisible: boolean,
    setModalVisible: (a: boolean) => void
    children: React.JSX.Element | React.JSX.Element[]
    modalViewStyle?: StyleProp<ViewStyle>
}
export const CommonModal = (props: CommonModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            style={{justifyContent: "center", alignItems: "center", alignContent: "center"}}>
            <ExitModal setModalVisible={props.setModalVisible}/>
            <View style={modalStyles.centeredView}>
                <ExitModal setModalVisible={props.setModalVisible}/>
                <View style={[modalStyles.modalView, props.modalViewStyle]}>
                    {props.children}
                </View>
                <ExitModal setModalVisible={props.setModalVisible}/>
            </View>
            <ExitModal setModalVisible={props.setModalVisible}/>
        </Modal>
    )
}