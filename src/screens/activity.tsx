import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';


const styles = StyleSheet.create({
    text: {
        color: "#000000",
        fontSize: 16,
        textAlignVertical: "center",
        marginLeft: 10
    }
})

const VSpace = (): React.JSX.Element => {
    return <View style={{marginVertical: 12}}/>
}

type Props = {
    name: string,
    surname: string
}
function Activity(props: Props): React.JSX.Element {
    return (
        <View style={{marginHorizontal: 30}}>
            <VSpace/>
            <View style={{flexDirection: "row"}}>
                <Image source={require('../assets/id-card.png')} style={{width: 50, height: 50}} />
                <Text style={styles.text}>{props.name} {props.surname}</Text>
            </View>
            <VSpace/>
            <View>
                <Text>Veuillez renseigner les champs suivants :</Text>
            </View>
            <VSpace/>
            <View style={{marginHorizontal: 30}}>
                <View style={{flexDirection: "row"}}>
                    <Image source={require('../assets/location.png')} style={{width: 50, height: 50}} />
                    <Text style={styles.text}>Lieu</Text>
                </View>
                <VSpace/>
                <View style={{flexDirection: "row"}}>
                    <Image source={require('../assets/todo.png')} style={{width: 50, height: 50}} />
                    <Text style={styles.text}>Activité</Text>
                </View>
                <VSpace/>
                <View style={{flexDirection: "row"}}>
                    <Image source={require('../assets/chemical.png')} style={{width: 50, height: 50}} />
                    <Text style={styles.text}>Produits</Text>
                </View>
                <VSpace/>
                <View style={{flexDirection: "row"}}>
                    <Image source={require('../assets/hand.png')} style={{width: 50, height: 50}} />
                    <Text style={styles.text}>Utilisation des produits</Text>
                </View>
            </View>
        </View>
    )
}

export default Activity