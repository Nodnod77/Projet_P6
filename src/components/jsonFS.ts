import * as RNFS from "react-native-fs";
import {configT, outputT} from "../types/userData.tsx";

export class JsonFS {
    isLoaded: boolean = false
    loadingFailure: boolean = false

    output: outputT[] = [] as outputT[]
    config: configT = {} as configT

    constructor() {
        let first: boolean = false
        let second: boolean = false

        // Load config.json
        RNFS.readFile(RNFS.DocumentDirectoryPath + "/config.json")
            .then((result) => {
                this.config = JSON.parse(result)
                first = true
                if(first && second) this.isLoaded = true
            })
            .catch((err) => {
                this.loadingFailure = true
                console.error("Couldn't load config file, see below")
                console.error(err.toString())
            })

        // Load output.json
        RNFS.readFile(RNFS.DocumentDirectoryPath + "/output.json")
            .then((result) => {
                this.output = JSON.parse(result)
                second = true
                if(first && second) this.isLoaded = true
            })
            .catch((err) => {
                this.loadingFailure = true
                console.error("Couldn't load output file, see below")
                console.error(err.toString())
            })
    }

    async addUser(
        name: string,
        surname: string
    ) {
        // Wait for loading to finish and check failure
        if(this.loadingFailure) return
        while(! this.isLoaded) {
            console.log("Files still not loaded...")
            await new Promise(f => setTimeout(f, 10));
        }

        this.config.utilisateurs.push({prenom: name, nom: surname})
        RNFS.writeFile(
            RNFS.DocumentDirectoryPath + "/config.json",
            JSON.stringify(JSON.stringify(this.config))
        )
            .catch((err) => {
                console.error("Couldn't add user to config file, see below")
                console.error(err.toString())
            })
    }

    async addEntry(
        output: outputT
    ){
        // Wait for loading to finish and check failure
        if(this.loadingFailure) return
        while(! this.isLoaded){
            console.log("Files still not loaded...")
            await new Promise(f => setTimeout(f, 10));
        }

        this.output.push(output)
        RNFS.writeFile(
            RNFS.DocumentDirectoryPath + "/output.json",
            JSON.stringify(JSON.stringify(this.output))
        )
            .catch((err) => {
                console.error("Couldn't add entry to output file, see below")
                console.error(err.toString())
            })
    }
}