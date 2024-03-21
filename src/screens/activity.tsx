import React, {useState} from 'react';
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
import {outputT, userData} from "../types/dataTypes.tsx";
import {StackParamList} from "../components/navigation/StackNavigator.tsx";
import {RouteProp} from '@react-navigation/native';
import JsonFS from "../components/jsonFS.ts";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import {RFPercentage} from "react-native-responsive-fontsize";
import ScrollView = Animated.ScrollView;


interface ActivityProps {
    route: RouteProp<StackParamList, 'ActivityScreen'>;
}
function Activity({ route }: ActivityProps): React.ReactElement{
    // Params
    const { prenom, nom }: userData = route.params.user;

    // Time
    const [started, setStarted] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [time, setTime] = useState(0)
    // Clock counter doesn't reset itself when revealed, here is a little hack : reload component via state
    const [clockKey, clockReset] = useState(0)

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
        <ScrollView style={{
            paddingHorizontal: RFPercentage(3.9),
        }}>

            {/* ------------------------------------------ Print User ---------------------------------------------- */}
            <VSpace margin={RFPercentage(1.8)}/>
            <View style={{flexDirection: "row"}}>
                <Image
                    source={require('../styles/assets/id-card.png')}
                    style={activityStyles.image}
                />
                <Text style={[activityStyles.text, {color: "#000"}]}>
                    {prenom} {nom}
                </Text>
            </View>
            <VSpace margin={RFPercentage(0.4)}/>
            <View>
                <Text style={activityStyles.text}>Veuillez renseigner les champs suivants :</Text>
            </View>

            {/* --------------------------------------- Select options --------------------------------------------- */}
            <View style={{marginRight: RFPercentage(2.2), marginLeft: RFPercentage(4)}}>
                <VSpace />
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
            </View>

            {/* ---------------------------- If Started, show stop buttons ------------------------------------- */}
            <View style={{display: started ? undefined : "none", paddingBottom: RFPercentage(3)}}>
                <VSpace margin={RFPercentage(1)}/>
                <View style={{alignItems: "center", margin: RFPercentage(1)}}>
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
                            prenom: prenom,
                            nom: nom,
                            lieu: lieu,
                            activite: activite,
                            produits: produits,
                            pratiques: utilisations,
                            date_debut: new Date(startTime).toISOString(),
                            duree: Math.floor((Date.now() - startTime) / 1000) // From ms to seconds
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
                            setStartTime(Date.now)
                            setTime(0) // Just to be sure...

                            setStarted(true) // Switch buttons
                        }else{
                            Alert.alert(
                                'Il manque un ou plusieurs paramètres',
                                'Veuillez au moins choisir une activitée et un lieu'
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

export default Activity
