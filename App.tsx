/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import * as RNFS from 'react-native-fs'

import StackNavigator from "./src/components/navigation/StackNavigator.tsx";
import JsonFS, {configFile, outputFile} from "./src/components/jsonFS.ts";
import initApp from "./src/config/initFiles.ts";

function App(): React.JSX.Element {
  let conf = false, outp = false

  JsonFS.loadPaths() // Get configFile and outputFile

  new Promise(async () => {
    await RNFS.exists(configFile).then((res) => {
      conf = res
    })
    await RNFS.exists(outputFile).then((res) => {
      outp = res
    })

    if(!conf && !outp){
      console.debug("First time launching app, init...")
      initApp()
    }else if(!conf || !outp){
      console.error(`${conf ? "Output" : "Config"} file is missing, regenerating it`)
      initApp(conf, outp)
    }
  })


  return (
      <StackNavigator/>
  );
}

export default App;
