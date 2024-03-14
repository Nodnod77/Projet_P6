import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageSourcePropType,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import {Dropdown, MultiSelect} from "react-native-element-dropdown";


const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        textAlignVertical: "center",
        marginHorizontal: 10
    },
    selectableText: {
        fontSize: 18,
        textAlignVertical: "center",
        marginHorizontal: 5
    },
    selectedContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        marginVertical: 3,
        marginHorizontal: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 1,
    },
    dropdown: {
        minHeight: 60,
        width: "55%",
        alignSelf: "center",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    itemTextStyle: {
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 500,
        height: 700,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#4484c9',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        borderRadius: 100,
        padding: 22,
    },
})

type Data = {
    value: number,
    label: string,
    disabled?: boolean
}

const VSpace = (): React.JSX.Element => {
    return <View style={{marginVertical: 24}}/>
}

const renderItem = (
    item: Data
): React.JSX.Element => {
    return (
        <View style={{marginRight: 5}}>
            <Text style={[styles.selectableText, {color: "#000"}]}>{item.label}</Text>
        </View>
    );
};

const renderSelectedItem = (
    item: Data,
    unSelect?: ((item: Data) => void)
): React.JSX.Element => (
    <View style={styles.selectedContainer}>
        <Text style={[styles.selectableText, {color: "#000"}]}>{item.label}</Text>
        <Image source={require("../assets/cross.png")} style={{width: 15, height: 15, opacity: 0.6}} />
    </View>
)

type InputLineProps = {
    isModal?: boolean,
    data?: Data[],
    icon: ImageSourcePropType,
    name: string
}
const InputLine = (props: InputLineProps): React.JSX.Element => {
    const [value, setValue] = React.useState(-1)
    const [multipleValue, setMultipleValue] = React.useState([""])
    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <View style={{flexDirection: "row"}}>
            <Image source={props.icon} style={{width: 70, height: 70}} />
            <Text style={[styles.text, {color: "#000"}, {width: 180}]}>{props.name}</Text>
            {
                props.isModal ?
                    <View style={{width: "55%", justifyContent: "center", alignItems: "center"}}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Pressable
                                        style={[styles.buttonClose, {alignSelf: "flex-end"}]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Image source={require("../assets/cross.png")} style={{width: 30, height: 30}} />
                                    </Pressable>
                                    <MultiSelect
                                        style={[styles.dropdown, {width: "90%"}]}
                                        selectedTextStyle={styles.selectableText}
                                        itemContainerStyle={{padding: 8}}
                                        data={props.data!}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Select item"
                                        value={multipleValue}
                                        search
                                        searchPlaceholder="Search..."
                                        onChange={item => {
                                            setMultipleValue(item);
                                        }}
                                        inside
                                        renderItem={renderItem}
                                        renderSelectedItem={renderSelectedItem}
                                    />
                                </View>
                            </View>
                        </Modal>
                        <Pressable
                            style={styles.buttonOpen}
                            onPress={() => setModalVisible(true)}>
                            <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 20}]}>
                                Sélectionner {props.name.toLowerCase()}
                            </Text>
                        </Pressable>
                    </View>
                    :
                    <Dropdown
                        style={styles.dropdown}
                        itemTextStyle={[styles.itemTextStyle, {color: "#000"}]}
                        selectedTextStyle={[styles.itemTextStyle, {color: "#000"}]}
                        data={props.data!}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={''}
                        searchPlaceholder="Rechercher..."
                        value={props.data![value]}
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
            }
        </View>
    )
}

type ActivityProps = {
    name: string,
    surname: string
}
function Activity(props: ActivityProps): React.JSX.Element {
    return (
        <View style={{paddingHorizontal: 40, width: Dimensions.get('window').width}}>
            <VSpace/>
            <View style={{flexDirection: "row"}}>
                <Image source={require('../assets/id-card.png')} style={{width: 70, height: 70}} />
                <Text style={[styles.text, {color: "#000"}]}>{props.name} {props.surname}</Text>
            </View>
            <VSpace/>
            <View>
                <Text style={styles.text}>Veuillez renseigner les champs suivants :</Text>
            </View>
            <VSpace/>
            <View style={{marginLeft: 30}}>
                <InputLine icon={require("../assets/location.png")} name={"Lieu"} data={[
                    {value: 0, label: "First"},
                    {value: 1, label: "Second"},
                    {value: 2, label: "Third"},
                ]}/>
                <VSpace/>
                <InputLine icon={require("../assets/todo.png")} name={"Activité"} data={[
                    {value: 0, label: "First"},
                    {value: 1, label: "Second"},
                    {value: 2, label: "Third"},
                ]}/>
                <VSpace/>
                <InputLine isModal={true} icon={require("../assets/chemical.png")} name={"Produits"} data={[
                    {value: 0, label: "First"},
                    {value: 1, label: "Second"},
                    {value: 2, label: "Third"},
                ]}/>
                <VSpace/>
                <InputLine isModal={true} icon={require("../assets/hand.png")} name={"Utilisation des produits"} data={[
                    {value: 0, label: "First"},
                    {value: 1, label: "Second"},
                    {value: 2, label: "Third"},
                ]}/>
            </View>
        </View>
    )
}

export default Activity