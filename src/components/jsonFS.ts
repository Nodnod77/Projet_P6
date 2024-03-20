import * as RNFS from "react-native-fs";
import {configT, outputT} from "../types/dataTypes.tsx";
import {Platform} from "react-native";


export var configFile: string = ""
export var outputFile: string = ""


// Singleton JsonFS handler
export default class JsonFS {
    private static isLoaded: boolean = false
    private static loadingFailure: boolean = false

    private static config: configT = {} as configT
    private static output: outputT[] = [] as outputT[]

    private static instance: JsonFS

    // ----Getters for config and output---- //
    public get output() {
        if(!JsonFS.isLoaded){
            console.error("Output is being read before JSON load is complete, this is not supposed to happen !")
        }
        return JsonFS.output
    }
    public get config() {
        if(!JsonFS.isLoaded){
            console.error("Config is being read before JSON load is complete, this is not supposed to happen !")
        }
        return JsonFS.config
    }

    private constructor() {
        let first: boolean = false
        let second: boolean = false

        console.debug("Constructing JsonFS...")

        // NOTE: This part need test for iOS
        JsonFS.loadPaths()

        // Load config.json
        RNFS.exists(configFile).then((resConf) => {
            if(resConf){
                RNFS.readFile(configFile)
                    .then((result) => {
                        JsonFS.config = JSON.parse(result).config
                        first = true
                        if (first && second) JsonFS.isLoaded = true
                    })
                    .catch((err) => {
                        JsonFS.loadingFailure = true
                        console.error("Couldn't load config file, see below")
                        console.error(err.toString())
                    })
                // Load output.json
                RNFS.exists(outputFile).then((resOutp) => {
                    if(resOutp){
                        RNFS.readFile(outputFile)
                            .then((result) => {
                                JsonFS.output = JSON.parse(result).output
                                second = true
                                if(first && second) JsonFS.isLoaded = true
                            })
                            .catch((err) => {
                                JsonFS.loadingFailure = true
                                console.error("Couldn't load output file, see below")
                                console.error(err.toString())
                            })
                    }else{
                        console.error("Output file is missing, but config file is here...")
                    }
                })
            }else{
                // Queue a macro task to rebuild JsonFS
                setTimeout(() => JsonFS.instance = new JsonFS(), 0)
            }
        })
    }

    private write(file: string) {
        RNFS.writeFile(
            file === "config" ? configFile : outputFile,
            `{"${file}": ${JSON.stringify(file === "config" ? JsonFS.config : JsonFS.output)}}`
        )
            .catch((err) => {
                console.error(`Couldn't append to ${file} file, see below`)
                console.error(err.toString())
            })
    }




    // -------------Public Methods -------------- //
    public static loadPaths() {
        if(Platform.OS === "android"){
            configFile = RNFS.ExternalDirectoryPath + "/config.json"
            outputFile = RNFS.ExternalDirectoryPath + "/output.json"
        }else if(Platform.OS === "ios"){
            configFile = RNFS.DocumentDirectoryPath + "/config.json"
            outputFile = RNFS.DocumentDirectoryPath + "/output.json"
        }else throw new Error("Platform is not recognized as either android or iOS")
    }

    public static getInstance(): JsonFS {
        if(! JsonFS.instance){
            JsonFS.instance = new JsonFS()
        }

        return JsonFS.instance
    }

    public static async waitForLoad() {
        if(JsonFS.loadingFailure) return
        while(! JsonFS.isLoaded){
            console.log("Files still not loaded...")
            await new Promise(f => setTimeout(f, 600));
        }
    }

    public async addUser(
        name: string,
        surname: string
    ) {
        // Wait for loading to finish and check failure
        await JsonFS.waitForLoad()

        JsonFS.config.utilisateurs.push({prenom: name, nom: surname})
        this.write("config")
    }

    public async deleteUser(
        name: string,
        surname: string
    ){
        // Wait for loading to finish and check failure
        await JsonFS.waitForLoad()

        JsonFS.config.utilisateurs.splice(
            JsonFS.config.utilisateurs.indexOf({prenom: name, nom: surname})
        )
        this.write("config");
    }

    public async addEntry(
        entry: outputT
    ){
        // Wait for loading to finish and check failure
        await JsonFS.waitForLoad()

        console.debug(entry) // TODO: Remove me
        JsonFS.output.push(entry)
        this.write("output")
    }
}
