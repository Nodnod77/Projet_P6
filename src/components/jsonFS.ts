import * as RNFS from "react-native-fs";
import {configT, outputT} from "../types/userData.tsx";


export const configFile = RNFS.DocumentDirectoryPath + "/config.json"
export const outputFile = RNFS.DocumentDirectoryPath + "/output.json"

// Singleton JsonFS handler
export default class JsonFS {
    private static isLoaded: boolean = false
    private static loadingFailure: boolean = false

    private static output: outputT[] = [] as outputT[]
    private static config: configT = {} as configT

    private static instance: JsonFS

    private constructor() {
        let first: boolean = false
        let second: boolean = false

        // Load config.json
        RNFS.readFile(configFile)
            .then((result) => {
                JsonFS.config = JSON.parse(result)
                console.log(JsonFS.config) // TODO: Remove me
                first = true
                if(first && second) JsonFS.isLoaded = true
            })
            .catch((err) => {
                JsonFS.loadingFailure = true
                console.error("Couldn't load config file, see below")
                console.error(err.toString())
            })

        // Load output.json
        RNFS.readFile(outputFile)
            .then((result) => {
                JsonFS.output = JSON.parse(result)
                console.log(JsonFS.output) // TODO: Remove me
                second = true
                if(first && second) JsonFS.isLoaded = true
            })
            .catch((err) => {
                JsonFS.loadingFailure = true
                console.error("Couldn't load output file, see below")
                console.error(err.toString())
            })
    }

    public static async getInstance(): Promise<JsonFS> {
        if(! JsonFS.instance){
            JsonFS.instance = new JsonFS()
        }

        return JsonFS.instance
    }

    public static async addUser(
        name: string,
        surname: string
    ) {
        // Wait for loading to finish and check failure
        if(JsonFS.loadingFailure) return
        while(! JsonFS.isLoaded) {
            console.log("Files still not loaded...")
            await new Promise(f => setTimeout(f, 10));
        }

        JsonFS.config.utilisateurs.push({prenom: name, nom: surname})
        RNFS.writeFile(
            configFile,
            JSON.stringify(JSON.stringify(JsonFS.config))
        )
            .catch((err) => {
                console.error("Couldn't add user to config file, see below")
                console.error(err.toString())
            })
    }

    public static async addEntry(
        output: outputT
    ){
        // Wait for loading to finish and check failure
        if(JsonFS.loadingFailure) return
        while(! JsonFS.isLoaded){
            console.log("Files still not loaded...")
            await new Promise(f => setTimeout(f, 10));
        }

        JsonFS.output.push(output)
        RNFS.writeFile(
            outputFile,
            JSON.stringify(JSON.stringify(JsonFS.output))
        )
            .catch((err) => {
                console.error("Couldn't add entry to output file, see below")
                console.error(err.toString())
            })
    }
}