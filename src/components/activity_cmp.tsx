import React from "react";
import {Alert, Image, ImageSourcePropType, Modal, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Dropdown, MultiSelect} from "react-native-element-dropdown";
import {styles} from "../styles/activityStyles.ts";
import {genericData} from "../types/userData.tsx";
import {RFPercentage} from "react-native-responsive-fontsize";

const renderItem = (
    item: genericData
): React.JSX.Element => {
    return (
        <View style={{marginRight: 5}}>
            <Text style={styles.selectableText}>{item.label}</Text>
        </View>
    );
};

const renderSelectedItem = (
    item: genericData,
): React.JSX.Element => (
    <View style={styles.selectedContainer}>
        <Text style={styles.selectableText}>{item.label}</Text>
        <Image source={require("../styles/assets/cross.png")} style={{width: 15, height: 15, opacity: 0.6}} />
    </View>
)

interface VSpaceProps {
    margin?: number
}
export const VSpace = (props: VSpaceProps): React.JSX.Element => {
    return <View style={{marginVertical: props.margin ?? 45}}/>
}

const ExitModal = ({setModalVisible}: any): React.JSX.Element => {
    return <TouchableOpacity
        style={styles.exitModal}
        onPress={() => {
            setModalVisible(false)
        }}>
    </TouchableOpacity>
}

interface ModalActivityProps {
    name: string,
    data: string[],
    value: string[],
    setValue: React.Dispatch<React.SetStateAction<string[]>>
}
export const ModalActivity = (props: ModalActivityProps): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false)
    let dataAsObj = props.data.map<genericData>((v) => {return {label: v}})

    return (
        <View style={{width: "55%", justifyContent: "center", alignItems: "center"}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                style={{justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                <ExitModal setModalVisible={setModalVisible}/>
                <View style={styles.centeredView}>
                    <ExitModal setModalVisible={setModalVisible}/>
                    <View style={styles.modalView}>
                        <MultiSelect
                            style={[styles.dropdown, {padding: RFPercentage(0.4), width: "90%"}]}
                            itemContainerStyle={styles.itemContainer}
                            containerStyle={{padding: RFPercentage(0.6)}}
                            data={dataAsObj}
                            labelField="label"
                            valueField="label"
                            placeholder="   ..."
                            value={props.value}
                            search
                            maxHeight={RFPercentage(32)}
                            searchPlaceholder="Rechercher..."
                            onChange={(item: string[]) => props.setValue(item)}
                            inside
                            renderItem={renderItem}
                            renderSelectedItem={renderSelectedItem}
                        />
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image source={require("../styles/assets/cross.png")} style={{width: 30, height: 30}} />
                        </Pressable>
                    </View>
                    <ExitModal setModalVisible={setModalVisible}/>
                </View>
                <ExitModal setModalVisible={setModalVisible}/>
            </Modal>
            <Pressable
                style={styles.buttonOpen}
                onPress={() => setModalVisible(true)}>
                <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 24, textAlign: "center"}]}>
                    Sélectionner {props.name.toLowerCase()}
                </Text>
            </Pressable>
        </View>
    )
}

interface DropListProps {
    data: string[],
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}
export const DropList = (props: DropListProps): React.JSX.Element => {
    let dataAsObj: genericData[] =
        props.data.map<genericData>((v) => {return {label: v}})

    return (
        <Dropdown
            style={styles.dropdown}
            itemTextStyle={[styles.itemTextStyle, {color: "#000"}]}
            selectedTextStyle={[styles.itemTextStyle, {color: "#000"}]}
            data={dataAsObj}
            search
            maxHeight={RFPercentage(25)}
            labelField="label"
            valueField="label"
            placeholder={''}
            searchPlaceholder="Rechercher..."
            value={dataAsObj.find((e) => e.label === props.value)}
            onChange={item => {
                props.setValue(item.label);
            }}
        />
    )
}

interface InputLineProps {
    icon: ImageSourcePropType,
    name: string,
    children: React.JSX.Element
}
export const InputLine = (props: InputLineProps): React.JSX.Element => {
    return (
        <View style={{flexDirection: "row"}}>
            <Image source={props.icon} style={{width: 70, height: 70}} />
            <Text style={[styles.text, {color: "#000"}, {width: 180}]}>{props.name}</Text>
            {props.children}
        </View>
    )
}