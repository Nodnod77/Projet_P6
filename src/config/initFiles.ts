import * as RNFS from "react-native-fs";
import {configFile, outputFile} from "../components/jsonFS.ts";

export default function initApp() {
    RNFS.writeFile(
        configFile,
        `{
            "config": {
                "utilisateurs": [],
                "lieux": [],
                "activites": [],
                "produits": [],
                "pratiques": []
            }
        }`
    )
        .catch((err) => {
            console.error("Couldn't create config file, throwing...")
            throw err
        })

    RNFS.writeFile(
        outputFile,
        `{
            "output": []
        }`
    )
        .catch((err) => {
            console.error("Couldn't create output file, throwing...")
            throw err
        })
}