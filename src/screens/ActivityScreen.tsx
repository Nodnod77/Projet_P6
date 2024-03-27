import React, {useRef, useState} from 'react';
import {
    Alert, Animated,
    Image,
    Pressable, Text,
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
import {compteurT, outputT, userData} from "../types/dataTypes.ts";
import {StackParamList} from "../components/navigation/stack_navigator.tsx";
import {RouteProp} from '@react-navigation/native';
import JsonFS from "../components/json_file_system.ts";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import {RFPercentage} from "react-native-responsive-fontsize";
import ScrollView = Animated.ScrollView;
import {useActivity} from "../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";


async function sort(data: string[], prenom: string, nom: string, attr: string): Promise<Array<string>> {
    let value = await AsyncStorage.getItem(prenom.toString() + nom.toString())

    if(value != null){
        let save: compteurT[] = JSON.parse(value)[attr]
        return data.sort((a, b) => {
            let aIndex = save.findIndex((v) => v.nom === a)
            let bIndex = save.findIndex((v) => v.nom === b)
            if(aIndex == -1 && bIndex == -1) return 0
            else if(aIndex == -1) return 1
            else if(bIndex == -1) return -1
            else return save[bIndex].compteur - save[aIndex].compteur
        })
    }else
        return data
}

interface ActivityProps {
    route: RouteProp<StackParamList, 'ActivityScreen'>;
}
function ActivityScreen({ route }: ActivityProps): React.ReactElement{
    // Params
    const { prenom, nom }: userData = route.params.user;
    const moment = require('moment-timezone');
    // Time
    const { started, setStarted } = useActivity();
    const [startTime, setStartTime] = useState("")
    const [time, setTime] = useState(0)
    // Clock counter doesn't reset itself when revealed, here is a little hack : reload component via state
    const [clockKey, clockReset] = useState(0)


    // Data for json output
    const [lieu, setLieu] = useState("")
    const [activite, setActivite] = useState("")
    const [produits, setProduits] = useState([] as string[])
    const [utilisations, setUtilisations] = useState([] as string[])
    const lieuData = useRef([] as string[])
    const activiteData = useRef([] as string[])
    const produitsData = useRef([] as string[])
    const utilisationsData = useRef([] as string[])

    // Force render
    const [, render] = useState(false)

    // JSON handler
    const jsHandle = JsonFS.getInstance()
    JsonFS.waitForLoad().then(async () => {
        lieuData.current = await sort(jsHandle.config.lieux, prenom, nom, "lieux")
        activiteData.current = await sort(jsHandle.config.activites, prenom, nom, "activites")
        produitsData.current = await sort(jsHandle.config.produits, prenom, nom, "produits")
        utilisationsData.current = await sort(jsHandle.config.pratiques, prenom, nom, "pratiques")
        render(true)
    })

    // Warning modal
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={{
            backgroundColor: "#FFF"
        }}>

            {/* ------------------------------------------ Print User ---------------------------------------------- */}
            <VSpace margin={RFPercentage(0.5)}/>
            <View style={{flexDirection: "row",marginHorizontal:RFPercentage(2)}}>
                <Image
                    source={require('../styles/assets/id-card.png')}
                    style={[activityStyles.image,activityStyles.imageSize2,{marginRight: RFPercentage(2)}]}

                />
                <Text style={[activityStyles.text, { fontWeight:"bold", fontStyle:'italic',color:'rgba(55,55,59,0.82)'}]}>
                    {prenom} {nom}
                </Text>
            </View>
            <VSpace margin={RFPercentage(0.4)}/>
            <View>
                <Text style={[activityStyles.text, {paddingTop: RFPercentage(1),marginHorizontal:RFPercentage(2.5)}]}>Veuillez renseigner les champs suivants :</Text>
            </View>

            {/* --------------------------------------- Select options --------------------------------------------- */}
            <View style={{marginRight: RFPercentage(2.2), marginLeft: RFPercentage(4)}}>
                <VSpace />
                <InputLine icon={require("../styles/assets/location.png")} name={"Lieu"} imageSize={[activityStyles.imageSize,{marginLeft:RFPercentage(-0.2)}]}>
                    <DropList value={lieu} setValue={setLieu} data={lieuData.current} saveName={"lieux"} user={{prenom: prenom, nom: nom}} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/todo.png")} imageSize={activityStyles.imageSize} name={"Activité"}>
                    <DropList value={activite} setValue={setActivite} data={activiteData.current} saveName={"activites"} user={{prenom: prenom, nom: nom}} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/chemical.png")} imageSize={[activityStyles.imageSize,{marginLeft:RFPercentage(-0.6),marginTop:RFPercentage(1)}]} name={"Produits"}>
                    <ModalActivity
                        value={produits} setValue={setProduits}
                        name={"Produits"}
                        data={produitsData.current} />
                </InputLine>
                <VSpace/>
                <InputLine icon={require("../styles/assets/hand.png")} imageSize={[activityStyles.imageSize,{marginLeft:RFPercentage(-0.6), marginTop:RFPercentage(2),}]} name={"Modes d'utilisation"}>
                    <ModalActivity
                        value={utilisations} setValue={setUtilisations}
                        name={"Modes d'utilisation"}
                        data={utilisationsData.current} />
                </InputLine>
            </View>

            {/* ---------------------------- If Started, show stop buttons ------------------------------------- */}
            <View style={{display: started ? undefined : "none", paddingBottom: RFPercentage(3)}}>
                <VSpace margin={RFPercentage(1)}/>
                <View style={{alignItems: "center", marginTop: RFPercentage(1),marginBottom:RFPercentage(2)}}>
                    <CountdownCircleTimer
                        key={clockKey} // Needed to reset clock counter when revealed
                        size={RFPercentage(11)}
                        isPlaying={started}
                        isGrowing
                        duration={60}
                        colors="#be2c54"
                        onComplete={() => {
                            // do your stuff here
                            setTime(time + 60)
                            return { shouldRepeat: true }
                        }}
                    >
                        {({ elapsedTime }) => {
                            let t = time + elapsedTime
                            let h = Math.floor(t / 3600)
                            let m = Math.floor(t / 60 - h * 60)
                            let s = Math.floor(t - h * 3600 - m * 60)
                            return (
                                <Text style={{fontSize: RFPercentage(1.8)}}>
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
                            prenom: prenom,
                            nom: nom,
                            lieu: lieu,
                            activite: activite,
                            produits: produits,
                            pratiques: utilisations,
                            date_debut: startTime,
                            duree: Math.floor((moment.tz('Europe/Paris').diff(startTime) / 1000)) // From ms to seconds
                        }
                        jsHandle.addEntry(entry)

                        // Reset time
                        setTime(0)
                        clockReset((prevState) => prevState + 1)

                        // Switch buttons
                        setStarted(false)
                    }}>
                    <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: RFPercentage(3.9)}]}>
                        Finir activité en cours
                    </Text>
                </Pressable>
                <Pressable
                    style={activityStyles.buttonCancel}
                    onPress={() => {
                        // Popup Alert to confirm
                        setModalVisible(true) // If needed, states will be changed in the modal component
                    }}>
                    <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: RFPercentage(3.6)}]}>
                        Annuler
                    </Text>
                </Pressable>
                <WarningModal modalVisible={modalVisible} setWarningModalVisible={setModalVisible}
                              setStarted={setStarted} setTime={setTime} clockReset={clockReset} />
            </View>

            {/* ------------------------- If not started, show starting button ----------------------------------*/}
            <View style={{display: started ? "none" : undefined, paddingBottom: RFPercentage(3)}}>
                <VSpace margin={RFPercentage(3)}/>
                <Pressable
                    style={activityStyles.buttonStart}
                    onPress={() => {
                        if(lieu !== "" && activite !== "") {
                            // Time
                            setStartTime(moment.tz('Europe/Paris').format())
                            setTime(0) // Just to be sure...

                            setStarted(true) // Switch buttons
                        }else{
                            Alert.alert(
                                'Il manque un ou plusieurs paramètres',
                                'Veuillez au moins choisir une activité et un lieu'
                            )
                        }
                    }}>
                    <Text style={[activityStyles.text, {color: "white", fontWeight: "bold", fontSize: RFPercentage(6)}]}>
                        🏁 Commencer
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}


export default ActivityScreen;


