import React, {useState} from 'react';
import {
    Alert,
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
import {outputT, dataTypes} from "../types/dataTypes.tsx";
import {StackParamList} from "../components/navigation/StackNavigator.tsx";
import { RouteProp } from '@react-navigation/native';
import JsonFS from "../components/jsonFS.ts";



interface ActivityProps {
    route: RouteProp<StackParamList, 'ActivityScreen'>;
}

function Activity({ route }: ActivityProps): React.ReactElement{
    const [started, setStarted] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const { name, surname }: dataTypes = route.params.user;

    // Data for json output
    const [lieu, setLieu] = useState("")
    const [activite, setActivite] = useState("")
    const [produits, setProduits] = useState([] as string[])
    const [utilisation, setUtilisation] = useState([] as string[])

    // JSON handler
    const jsHandle = JsonFS.getInstance()

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
                    <DropList value={lieu} setValue={setLieu} data={jsHandle.config.lieux} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/todo.png")} name={"Activité"}>
                    <DropList value={activite} setValue={setActivite} data={jsHandle.config.activites} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/chemical.png")} name={"Produits"}>
                    <ModalActivity
                        value={produits} setValue={setProduits}
                        name={"Produits"}
                        data={jsHandle.config.produits} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/hand.png")} name={"Mode d'utilisation"}>
                    <ModalActivity
                        value={utilisation} setValue={setUtilisation}
                        name={"Mode d'utilisation"}
                        data={jsHandle.config.pratiques} />
                </InputLine>
                <VSpace/>
                {started ?
                    <><Pressable
                        style={styles.buttonEnd}
                        onPress={() => {
                            // Save into json
                            let entry: outputT = {
                                prenom: name,
                                nom: surname,
                                lieu: lieu,
                                activite: activite,
                                produits: produits,
                                pratiques: utilisation,
                                date_debut: new Date(startTime).toISOString(),
                                duree: Math.floor(Date.now() - startTime / 1000) // From ms to seconds
                            }
                            jsHandle.addEntry(entry)

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
                            // Popup Alert to confirm
                            Alert.alert(
                                '⚠️ Attention ⚠️',
                                'Si vous annuler cette session, les données liés à cette dernière ne seront pas' +
                                ' enregistrés.\n' +
                                'Voulez vous vraiment annuler cette session ?',
                                [{
                                    text: 'Oui',
                                    onPress: () => setStarted(false),
                                    style: 'cancel',
                                }],
                                {cancelable: true}
                            )
                        }}>
                        <Text style={[styles.text, {color: "white", fontWeight: "bold", fontSize: 30}]}>
                            Annuler
                        </Text>
                    </Pressable></>
                    :
                    <Pressable
                        style={styles.buttonStart}
                        onPress={() => {
                            if(lieu !== "" && activite !== "") {
                                setStartTime(Date.now) // Timer
                                setStarted(true) // Switch buttons
                            }else{
                                Alert.alert(
                                    'Il manque un ou plusieurs paramètres',
                                    'Veuillez au moins choisir une activitée et un lieu'
                                )
                            }
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
