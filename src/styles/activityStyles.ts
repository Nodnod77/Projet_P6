import {StyleSheet} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";


export const activityStyles = StyleSheet.create({
    image: {
        width: RFPercentage(7),
        height: RFPercentage(7),
        marginRight: RFPercentage(1)
    },
    text: {
        fontSize: RFPercentage(2.4),
        textAlignVertical: "center",
        marginHorizontal: RFPercentage(0.9)
    },
    selectableText: {
        color: "#000",
        fontSize: RFPercentage(1.6),
        textAlignVertical: "center",
        marginHorizontal: RFPercentage(0.5)
    },
    itemContainer: {
        padding: RFPercentage(0.6),
        marginVertical: RFPercentage(0.3),
        borderRadius: RFPercentage(1)
    },
    selectedContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFPercentage(1.3),
        borderWidth: 0.1,
        borderColor: 'rgba(0,0,0,0.3)',
        backgroundColor: 'white',
        marginVertical: RFPercentage(0.2),
        marginHorizontal: RFPercentage(0.5),
        paddingHorizontal: RFPercentage(1),
        paddingVertical: RFPercentage(0.7),
        elevation: 1,
    },
    dropdown: {
        minHeight: RFPercentage(5.5),
        maxHeight: RFPercentage(50),
        width: "55%",
        alignSelf: "flex-start",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: RFPercentage(0.8),
        paddingHorizontal: RFPercentage(0.7),
    },
    itemTextStyle: {
        fontSize: RFPercentage(1.6),
        paddingHorizontal: RFPercentage(0.8)
    },
    buttonOpen: {
        backgroundColor: '#2D9BF0',
        borderRadius: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(1),
        paddingVertical: RFPercentage(1.2),
        elevation: 4
    },
    buttonClose: {
        borderRadius: 100,
        padding: RFPercentage(1.4),
    },
    buttonStart: {
        height: RFPercentage(16),
        width: RFPercentage(44),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2D9BF0",
        borderRadius: RFPercentage(2),
        elevation: 8
    },
    buttonEnd: {
        height: RFPercentage(10),
        width: RFPercentage(45),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F27726",
        marginBottom: RFPercentage(1.9),
        borderRadius: RFPercentage(1.9),
        padding: RFPercentage(0.9),
        elevation: 5
    },
    buttonCancel: {
        height: RFPercentage(6.9),
        width: RFPercentage(15),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F24726",
        borderRadius: RFPercentage(1.9),
        padding: RFPercentage(0.9),
        elevation: 4
    },
})