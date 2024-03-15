import React, {useState} from 'react';
import {
    Dimensions,
    Image, Pressable,
    Text, View
} from 'react-native';
import {
    DropList,
    InputLine,
    ModalActivity,
    VSpace
} from "../components/activity_cmp.tsx";
import {styles} from "../styles/activityStyles.ts";
import {GenericData} from "../types/userData.tsx";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../navigation/StackNavigator.tsx";


// type ActivityProps =  NativeStackScreenProps<StackParamList, 'ActivityScreen'>;
//function Activity(props: ActivityProps): React.JSX.Element {
function Activity(props: {name: string, surname: string}): React.JSX.Element {
    const [started, setStarted] = useState(false)

    // Data for json output
    const [lieu, setLieu] = useState("")
    const [activite, setActivite] = useState("")
    const [produits, setProduits]: [GenericData[], React.Dispatch<React.SetStateAction<GenericData[]>>] = useState([] as GenericData[])
    const [utilisation, setUtilisation]: [GenericData[], React.Dispatch<React.SetStateAction<GenericData[]>>] = useState([] as GenericData[])

    return (
        <View style={{paddingHorizontal: 40, width: Dimensions.get('window').width}}>
            <VSpace margin={24}/>
            <View style={{flexDirection: "row"}}>
                <Image source={require('../assets/id-card.png')} style={{width: 70, height: 70}} />
                <Text style={[styles.text, {color: "#000"}]}>
                    {props.name/*props.route.params.name*/} {props.surname/*props.route.params.surname*/}
                </Text>
            </View>
            <VSpace margin={6}/>
            <View>
                <Text style={styles.text}>Veuillez renseigner les champs suivants :</Text>
            </View>
            <View style={{marginLeft: 30}}>
                <VSpace margin={30}/>
                <InputLine icon={require("../assets/location.png")} name={"Lieu"}>
                    <DropList value={lieu} setValue={setLieu} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../assets/todo.png")} name={"Activité"}>
                    <DropList value={activite} setValue={setActivite} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../assets/chemical.png")} name={"Produits"}>
                    <ModalActivity value={produits} setValue={setProduits} name={"Produits"} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../assets/hand.png")} name={"Utilisation des produits"}>
                    <ModalActivity value={utilisation} setValue={setUtilisation} name={"Utilisation des produits"} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                {started ?
                    <Pressable
                        style={styles.buttonStart}
                        onPress={() => {
                            // Start timer
                            // Switch buttons
                            setStarted(true)
                        }}>
                        <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 60}]}>
                            🏁 Commencer
                        </Text>
                    </Pressable>
                    :
                    <View>
                        <Pressable
                            style={styles.buttonEnd}
                            onPress={() => {
                                // Stop timer
                                // Save into json
                                // Switch buttons
                                setStarted(false)
                            }}>
                            <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 40}]}>
                                Finir activité en cours
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonCancel}
                            onPress={() => {
                                // Popup Modal to confirm
                                // If yes:
                                    // Stop timer, don't save into json
                                    // Switch Buttons
                                setStarted(false)
                            }}>
                            <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 30}]}>
                                Annuler
                            </Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    )
}

export default Activity