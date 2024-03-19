import React from "react";
import {Alert, Image, ImageSourcePropType, Modal, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Dropdown, MultiSelect} from "react-native-element-dropdown";
import {activityStyles} from "../styles/activityStyles.ts";
import {genericData} from "../types/dataTypes.tsx";
import {RFPercentage} from "react-native-responsive-fontsize";
import {homeStyles} from "../screens/HomeScreen.tsx";
import {CommonModal} from "./commonModal.tsx";

const renderItem = (
    item: genericData
): React.JSX.Element => {
    return (
        <View style={{marginRight: 5}}>
            <Text style={activityStyles.selectableText}>{item.label}</Text>
        </View>
    );
};

const renderSelectedItem = (
    item: genericData,
): React.JSX.Element => (
    <View style={activityStyles.selectedContainer}>
        <Text style={activityStyles.selectableText}>{item.label}</Text>
        <Image source={require("../styles/assets/cross.png")} style={{width: 15, height: 15, opacity: 0.6}} />
    </View>
)

interface VSpaceProps {
    margin?: number
}
export const VSpace = (props: VSpaceProps): React.JSX.Element => {
    return <View style={{marginVertical: props.margin ?? 45}}/>
}

interface WarningModalProps {
    modalVisible : boolean,
    setWarningModalVisible : (a: boolean) => void,
    setStarted: (a: boolean) => void
}
export const WarningModal : React.FC<WarningModalProps> = ({ setWarningModalVisible, modalVisible, setStarted }) => {
    return (
        <CommonModal modalVisible={modalVisible} setModalVisible={setWarningModalVisible}>
            <Text style={{marginBottom: 15, textAlign: 'center', color: 'black', fontSize: RFPercentage(3)}}>
                ⚠️ Attention ⚠
            </Text>
            <Text style={{marginBottom: 15, textAlign: 'center', color: 'black', fontSize: RFPercentage(2)}}>
                Si vous annuler cette session, les données liés à cette dernière ne seront pas enregistrés.
                Voulez vous vraiment annuler cette session ?
            </Text>
            <View style={{flexDirection: "row"}}>
                <Pressable
                    style={[homeStyles.modalButton, {marginHorizontal: RFPercentage(3)}]}
                    onPress={() => {
                        setWarningModalVisible(false)
                        setStarted(false)
                    }}>
                    <Text style={homeStyles.modalTextStyle}>Oui</Text>
                </Pressable>
                <Pressable
                    style={[homeStyles.modalButton, {marginHorizontal: RFPercentage(3)}]}
                    onPress={() => {
                        setWarningModalVisible(false)
                    }}>
                    <Text style={homeStyles.modalTextStyle}>Non</Text>
                </Pressable>
            </View>
        </CommonModal>
    );
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
            <CommonModal modalVisible={modalVisible} setModalVisible={setModalVisible}
                         modalViewStyle={{flexDirection: "row"}}>
                <MultiSelect
                    style={[activityStyles.dropdown, {padding: RFPercentage(0.4), width: "90%"}]}
                    itemContainerStyle={activityStyles.itemContainer}
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
                    style={[activityStyles.buttonClose, {alignSelf: "flex-start"}]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={require("../styles/assets/cross.png")} style={{width: 30, height: 30}} />
                </Pressable>
            </CommonModal>
            <Pressable
                style={activityStyles.buttonOpen}
                onPress={() => setModalVisible(true)}>
                <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: 24, textAlign: "center"}]}>
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
            style={activityStyles.dropdown}
            itemTextStyle={[activityStyles.itemTextStyle, {color: "#000"}]}
            selectedTextStyle={[activityStyles.itemTextStyle, {color: "#000"}]}
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
            <Text style={[activityStyles.text, {color: "#000"}, {width: 180}]}>{props.name}</Text>
            {props.children}
        </View>
    )
}
