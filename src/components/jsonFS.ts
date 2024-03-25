import * as RNFS from "react-native-fs";
import {compteurT, configT, outputT, userSaveT} from "../types/dataTypes.ts";
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
        let configLoaded: boolean = false
        let outputLoaded: boolean = false


        console.debug("Constructing JsonFS...")

        // NOTE: This part need test for iOS
        JsonFS.loadPaths()

        new Promise(async () => {
            // Load config.json
            await RNFS.exists(configFile).then(async (resConf) => {
                if(resConf){
                    await RNFS.readFile(configFile)
                        .then((result) => {
                            JsonFS.config = JSON.parse(result).config
                            configLoaded = true
                        })
                        .catch((err) => {
                            JsonFS.loadingFailure = true
                            console.error("Couldn't load config file, see below")
                            console.error(err.toString())
                        })
                }
            })

            // Load output.json
            await RNFS.exists(outputFile).then(async (resOutp) => {
                if(resOutp){
                    await RNFS.readFile(outputFile)
                        .then((result) => {
                            JsonFS.output = JSON.parse(result).output
                            outputLoaded = true
                        })
                        .catch((err) => {
                            JsonFS.loadingFailure = true
                            console.error("Couldn't load output file, see below")
                            console.error(err.toString())
                        })
                }
            })

            if(configLoaded && outputLoaded) // Everything is alright
                JsonFS.isLoaded = true
            else if(!configLoaded && !outputLoaded){ // No Problem, files are being created...
                // Queue a macro task to rebuild JsonFS after file creation is finished
                setTimeout(() => JsonFS.instance = new JsonFS(), 0)
            }else if(!configLoaded || !outputLoaded){ // Error
                throw new Error("Error loading files, try relaunching app...")
            }
        })
    }

    private write(file: string) {
        RNFS.writeFile(
            file === "config" ? configFile : outputFile,
            `{"${file}": ${JSON.stringify(file === "config" ? JsonFS.config : JsonFS.output, null, "\t")}}`
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
            console.debug("Waiting for files to finish loading...") // MAYBEDO: remove me
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
    ): Promise<boolean>{
        // Wait for loading to finish and check failure
        await JsonFS.waitForLoad()

        let index = JsonFS.config.utilisateurs.findIndex(
            (obj) =>  obj.nom === surname && obj.prenom === name
        )
        if(index !== -1){
            JsonFS.config.utilisateurs.splice(
                index,
                1
            )
        }else{ // User not found
            return false
        }

        this.write("config");
        return true
    }

    public async addEntry(
        entry: outputT
    ){
        const update = (entryAttr: string, arr: compteurT[]) => {
            let index = arr.findIndex((obj) => obj.nom === entryAttr)
            if(index < 0) arr.push({nom: entryAttr, compteur: 1})
            else arr[index].compteur++
        }

        // Wait for loading to finish and check failure
        await JsonFS.waitForLoad()

        let key = entry.prenom.toString() + entry.nom.toString()
        AsyncStorage.getItem(key).then((value) => {
            if(value == null){
                let save: userSaveT = {
                    lieux: [{nom: entry.lieu, compteur: 1}],
                    activites: [{nom: entry.activite, compteur: 1}],
                    produits: entry.produits.map<compteurT>((v) => {return {nom: v, compteur: 1}}),
                    pratiques: entry.pratiques.map<compteurT>((v) => {return {nom: v, compteur: 1}}),
                }
                //console.debug(save)
                AsyncStorage.setItem(key, JSON.stringify(save))
            }else{
                let res: userSaveT = JSON.parse(value)
                //console.debug(res)
                update(entry.lieu, res.lieux)
                update(entry.activite, res.activites)
                entry.produits.forEach((produit) => update(produit, res.produits))
                entry.pratiques.forEach((pratique) => update(pratique, res.pratiques))

                //console.debug(res)
                AsyncStorage.setItem(key, JSON.stringify(res))
            }
        })

        console.debug(entry) // TODO: Remove me
        JsonFS.output.push(entry)
        this.write("output")
    }
}
