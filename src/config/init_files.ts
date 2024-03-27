import * as RNFS from "react-native-fs";
import {configFile, outputFile} from "../components/json_file_system.ts";

export default function initApp(dontRegenConfig?: boolean, dontRegenOutput?: boolean) {
    if(!dontRegenConfig){
        console.debug("Generating config file...")
        RNFS.writeFile(
            configFile,
            `{
            "config": {
                "utilisateurs": [],
                "lieux": [],
                "activites": [
                    "Nettoyage/Désinfection sol",
                    "Décaper sol",
                    "Nettoyage/Désinfection surfaces",
                    "Nettoyage/Désinfection sanitaires"
                ],
                "produits": [
                    "Gel WC Ecolabel",
                    "Gel WC",
                    "Lessive liquide ultra concentrée Ecolabel",
                    "Savon noir en pâte",
                    "Lingettes désinfectantes",
                    "Détergent plonge",
                    "Lotion Lola neutral",
                    "Crème à récurer",
                    "Original Foam",
                    "Gaze imprégnée",
                    "Détergent surfaces vitrées",
                    "Émulsion haute brilliance",
                    "Bouche pores",
                    "Décapant puissant",
                    "Citrus ND+",
                    "Dégraissant désinfectant polyvalent",
                    "SURE Antibac Hand Wash Free",
                    "Suma Select Pur-Eco A7",
                    "Suma Special Pur-Eco L4",
                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                ],
                "pratiques": [
                    "Balais trapèze",
                    "Balais coco",
                    "Balais ciseaux",
                    "Chiffon",
                    "Serpillère",
                    "Vaporisateur"
                ]
            }
        }`
        )
            .catch((err) => {
                console.error("Couldnt create config file, failure...")
                throw err
            })
    }

    if(!dontRegenOutput){
        console.debug("Generating output file...")
        RNFS.writeFile(
            outputFile,
            `{"output": []}`
        )
            .catch((err) => {
                console.error("Couldnt create output file, failure...")
                throw err
            })
    }
}
