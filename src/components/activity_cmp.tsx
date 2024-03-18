import React from "react";
import {Alert, Image, ImageSourcePropType, Modal, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Dropdown, MultiSelect} from "react-native-element-dropdown";
import {styles} from "../styles/activityStyles.ts";
import {genericData} from "../types/userData.tsx";

const renderItem = (
    item: genericData
): React.JSX.Element => {
    return (
        <View style={{marginRight: 5}}>
            <Text style={[styles.selectableText, {color: "#000"}]}>{item.label}</Text>
        </View>
    );
};

const renderSelectedItem = (
    item: genericData,
): React.JSX.Element => (
    <View style={styles.selectedContainer}>
        <Text style={[styles.selectableText, {color: "#000"}]}>{item.label}</Text>
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
    data: genericData[],
    value: genericData[],
    setValue: React.Dispatch<React.SetStateAction<genericData[]>>
}
export const ModalActivity = (props: ModalActivityProps): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false)

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
                            style={[styles.dropdown, {width: "90%"}]}
                            selectedTextStyle={styles.selectableText}
                            itemContainerStyle={{padding: 8}}
                            data={props.data}
                            labelField="label"
                            valueField="label"
                            placeholder="   ..."
                            value={props.value.map<string>((v) => v.label)}
                            search
                            searchPlaceholder="Rechercher..."
                            onChange={(item: string[]) => {
                                props.setValue(
                                    item.map<genericData>(
                                        (i: string) => {
                                            let res = props.data.find(
                                                ({label}) => label === i
                                            )
                                            // Find should never return undefined
                                            if (res === undefined) throw new Error("Problem with data for modal")
                                            else return res
                                        }
                                    )
                                );
                            }}
                            inside
                            renderItem={renderItem}
                            renderSelectedItem={renderSelectedItem}
                        />
                        <Pressable
                            style={[styles.buttonClose, {alignSelf: "flex-end"}]}
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
    data: genericData[],
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}
export const DropList = (props: DropListProps): React.JSX.Element => {
    return (
        <Dropdown
            style={styles.dropdown}
            itemTextStyle={[styles.itemTextStyle, {color: "#000"}]}
            selectedTextStyle={[styles.itemTextStyle, {color: "#000"}]}
            data={props.data}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={''}
            searchPlaceholder="Rechercher..."
            value={props.data.find((e) => e.label === props.value)}
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