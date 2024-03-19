import {StyleSheet} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    text: {
        fontSize: RFPercentage(2.4),
        textAlignVertical: "center",
        marginHorizontal: 10
    },
    selectableText: {
        color: "#000",
        fontSize: RFPercentage(1.6),
        textAlignVertical: "center",
        marginHorizontal: 5
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
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        backgroundColor: 'white',
        marginVertical: 3,
        marginHorizontal: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 1,
    },
    dropdown: {
        minHeight: RFPercentage(5.5),
        maxHeight: RFPercentage(50),
        width: "55%",
        alignSelf: "flex-start",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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
        elevation: 2
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
        height: 100,
        width: 450,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F27726",
        marginBottom: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 5
    },
    buttonCancel: {
        height: 70,
        width: 150,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F24726",
        borderRadius: 20,
        padding: 10,
        elevation: 4
    },
})