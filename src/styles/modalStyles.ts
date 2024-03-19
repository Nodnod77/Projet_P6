import {StyleSheet} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";

export const modalStyles = StyleSheet.create({
    modalView: {
        alignItems: "center",
        width: RFPercentage(50),
        backgroundColor: 'white',
        borderRadius: RFPercentage(2),
        padding: RFPercentage(1.9),
        elevation: 5,
    },
    exitModal: {
        flex: 1,
        width: "100%",
        height: "100%",
        //backgroundColor: "rgba(0, 0, 0, 0.4)" // Make it visible if needed
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
})