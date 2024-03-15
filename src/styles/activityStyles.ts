import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        textAlignVertical: "center",
        marginHorizontal: 10
    },
    selectableText: {
        fontSize: 18,
        textAlignVertical: "center",
        marginHorizontal: 5
    },
    selectedContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        marginVertical: 3,
        marginHorizontal: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 1,
    },
    dropdown: {
        minHeight: 70,
        width: "55%",
        alignSelf: "center",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    itemTextStyle: {
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    modalView: {
        width: 600,
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#2D9BF0',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 16,
        elevation: 2
    },
    buttonClose: {
        borderRadius: 100,
        padding: 18,
    },
    exitModal: {
        flex: 1,
        width: "100%",
        height: "100%",
        //backgroundColor: "rgba(0, 0, 0, 0.4)" // Make it visible if needed
    },
    buttonStart: {
        height: 200,
        width: 550,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2D9BF0",
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
        elevation: 2
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
        elevation: 2
    },
})