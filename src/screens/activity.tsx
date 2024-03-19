import React, {useState} from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Pressable,
    Text,
    View
} from 'react-native';
import {
    DropList,
    InputLine,
    ModalActivity,
    VSpace,
    WarningModal
} from "../components/activity_cmp.tsx";
import {activityStyles} from "../styles/activityStyles.ts";
import {outputT, userData} from "../types/dataTypes.tsx";
import {StackParamList} from "../components/navigation/StackNavigator.tsx";
import {RouteProp} from '@react-navigation/native';
import JsonFS from "../components/jsonFS.ts";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import {RFPercentage} from "react-native-responsive-fontsize";


interface ActivityProps {
    route: RouteProp<StackParamList, 'ActivityScreen'>;
}

function Activity({ route }: ActivityProps): React.ReactElement{
    // Params
    const { name, surname }: userData = route.params.user;

    // Time
    const [started, setStarted] = useState(false)
    const [startTime, setStartTime] = useState(0)
    let time = 0

    // Data for json output
    const [lieu, setLieu] = useState("")
    const [lieuData, setLieuData] = useState([] as string[])
    const [activite, setActivite] = useState("")
    const [activiteData, setActiviteData] = useState([] as string[])
    const [produits, setProduits] = useState([] as string[])
    const [produitsData, setProduitsData] = useState([] as string[])
    const [utilisations, setUtilisationss] = useState([] as string[])
    const [utilisationsData, setUtilisationssData] = useState([] as string[])

    // JSON handler
    const jsHandle = JsonFS.getInstance()
    JsonFS.waitForLoad().then(() => {
        setLieuData(jsHandle.config.lieux)
        setActiviteData(jsHandle.config.activites)
        setProduitsData(jsHandle.config.produits)
        setUtilisationssData(jsHandle.config.pratiques)
    })

    // Warning modal
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={{paddingHorizontal: 40, width: Dimensions.get('window').width}}>
            <VSpace margin={24}/>
            <View style={{flexDirection: "row"}}>
                <Image source={require('../styles/assets/id-card.png')} style={{width: 70, height: 70}} />
                <Text style={[activityStyles.text, {color: "#000"}]}>
                    {name} {surname}
                </Text>
            </View>
            <VSpace margin={6}/>
            <View>
                <Text style={activityStyles.text}>Veuillez renseigner les champs suivants :</Text>
            </View>
            <View style={{marginLeft: 30}}>
                <VSpace margin={30}/>
                <InputLine icon={require("../styles/assets/location.png")} name={"Lieu"}>
                    <DropList value={lieu} setValue={setLieu} data={lieuData} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/todo.png")} name={"Activité"}>
                    <DropList value={activite} setValue={setActivite} data={activiteData} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/chemical.png")} name={"Produits"}>
                    <ModalActivity
                        value={produits} setValue={setProduits}
                        name={"Produits"}
                        data={produitsData} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/hand.png")} name={"Mode d'utilisations"}>
                    <ModalActivity
                        value={utilisations} setValue={setUtilisationss}
                        name={"Mode d'utilisations"}
                        data={utilisationsData} />
                </InputLine>
                {started ?
                    <><VSpace margin={RFPercentage(1)}/>
                    <View style={{alignItems: "center", margin: RFPercentage(1)}}>
                        <CountdownCircleTimer
                            isPlaying
                            isGrowing
                            duration={60}
                            colors="#be2c54"
                            onComplete={() => {
                                // do your stuff here
                                time += 60
                                return { shouldRepeat: true }
                            }}
                        >
                            {({ elapsedTime }) => {
                                let t = time + elapsedTime
                                let h = Math.floor(t / 3600)
                                let m = Math.floor(t / 60 - h * 60)
                                let s = Math.floor(t - h * 3600 - m * 60)
                                return (
                                    <Text style={{fontSize: RFPercentage(2)}}>
                                        {`${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${s}`}
                                    </Text>
                                )
                            }}
                        </CountdownCircleTimer>
                    </View>
                    <Pressable
                        style={activityStyles.buttonEnd}
                        onPress={() => {
                            // Save into json
                            let entry: outputT = {
                                prenom: name,
                                nom: surname,
                                lieu: lieu,
                                activite: activite,
                                produits: produits,
                                pratiques: utilisations,
                                date_debut: new Date(startTime).toISOString(),
                                duree: Math.floor((Date.now() - startTime) / 1000) // From ms to seconds
                            }
                            jsHandle.addEntry(entry)

                            // Switch buttons
                            setStarted(false)
                        }}>
                        <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: 40}]}>
                            Finir activité en cours
                        </Text>
                    </Pressable>
                    <Pressable
                        style={activityStyles.buttonCancel}
                        onPress={() => {
                            // Popup Alert to confirm
                            setModalVisible(true)
                        }}>
                        <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: 30}]}>
                            Annuler
                        </Text>
                    </Pressable>
                    <WarningModal modalVisible={modalVisible} setWarningModalVisible={setModalVisible}
                                  setStarted={setStarted} /></>
                    :
                    <><VSpace margin={RFPercentage(6)}/>
                    <Pressable
                        style={activityStyles.buttonStart}
                        onPress={() => {
                            if(lieu !== "" && activite !== "") {
                                setStartTime(Date.now) // Time
                                setStarted(true) // Switch buttons
                            }else{
                                Alert.alert(
                                    'Il manque un ou plusieurs paramètres',
                                    'Veuillez au moins choisir une activitée et un lieu'
                                )
                            }
                        }}>
                        <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: 60}]}>
                            🏁 Commencer
                        </Text>
                    </Pressable></>
                }
            </View>
        </View>
    )
}

export default Activity
