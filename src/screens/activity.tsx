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
import {genericData, userData} from "../types/userData.tsx";
import {StackParamList} from "../components/navigation/StackNavigator.tsx";
import { RouteProp } from '@react-navigation/native';



interface ActivityProps {
    route: RouteProp<StackParamList, 'ActivityScreen'>;
}

function Activity({ route }: ActivityProps): React.ReactElement{
    const [started, setStarted] = useState(false)
    const { name, surname }: userData = route.params.user;
    console.log(name + surname)
    console.log(route.params.user)

    let startTime: number, endTime: number

    // Data for json output
    const [lieu, setLieu] = useState("")
    const [activite, setActivite] = useState("")
    const [produits, setProduits]: [genericData[], React.Dispatch<React.SetStateAction<genericData[]>>] = useState([] as genericData[])
    const [utilisation, setUtilisation]: [genericData[], React.Dispatch<React.SetStateAction<genericData[]>>] = useState([] as genericData[])

    return (
        <View style={{paddingHorizontal: 40, width: Dimensions.get('window').width}}>
            <VSpace margin={24}/>
            <View style={{flexDirection: "row"}}>
                <Image source={require('../styles/assets/id-card.png')} style={{width: 70, height: 70}} />
                <Text style={[styles.text, {color: "#000"}]}>
                    {name} {surname}
                </Text>
            </View>
            <VSpace margin={6}/>
            <View>
                <Text style={styles.text}>Veuillez renseigner les champs suivants :</Text>
            </View>
            <View style={{marginLeft: 30}}>
                <VSpace margin={30}/>
                <InputLine icon={require("../styles/assets/location.png")} name={"Lieu"}>
                    <DropList value={lieu} setValue={setLieu} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/todo.png")} name={"Activité"}>
                    <DropList value={activite} setValue={setActivite} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/chemical.png")} name={"Produits"}>
                    <ModalActivity value={produits} setValue={setProduits} name={"Produits"} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/hand.png")} name={"Utilisation des produits"}>
                    <ModalActivity value={utilisation} setValue={setUtilisation} name={"Utilisation des produits"} data={[
                        {label: "First"},
                        {label: "Second"},
                        {label: "Third"},
                    ]} />
                </InputLine>
                <VSpace/>
                {started ?
                    <><Pressable
                        style={styles.buttonEnd}
                        onPress={() => {
                            // Check lieu and activite has a value

                            endTime = Date.now() // Stop timer

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
                    </Pressable></>
                    :
                    <Pressable
                        style={styles.buttonStart}
                        onPress={() => {
                            startTime = Date.now() // Start timer
                            setStarted(true) // Switch buttons
                        }}>
                        <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 60}]}>
                            🏁 Commencer
                        </Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

export default Activity