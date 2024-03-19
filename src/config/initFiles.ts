import * as RNFS from "react-native-fs";
import {configFile, outputFile} from "../components/jsonFS.ts";

export default function initApp() {
    RNFS.writeFile(
        configFile,
        `{
            "config": {
                "utilisateurs": [
                    {
                        "prenom": "Alex",
                        "nom": "AALLEEXX"
                    }
                ],
                "lieux": [
                  "Salle1",
                  "Couloir1",
                  "Salle2"
                ],
                "activites": [
                    "act1",
                    "act2",
                    "act3",
                    "act4",
                    "act5"
                ],
                "produits": [
                    "prod1",
                    "prod2",
                    "prod3",
                    "prod4",
                    "prod5",
                    "prod6",
                    "prod7",
                    "prod8",
                    "prod9",
                    "prod10"
                ],
                "pratiques": [
                    "prat1",
                    "prat2"
                ]
            }
        }`
    )
        .catch((err) => {
            console.error("Couldnt create config file, failure...")
            throw err
        })

    RNFS.writeFile(
        outputFile,
        `{"output": []}`
    )
        .catch((err) => {
            console.error("Couldnt create output file, failure...")
            throw err
        })
}