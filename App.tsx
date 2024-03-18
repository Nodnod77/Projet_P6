/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import * as RNFS from 'react-native-fs'

import StackNavigator from "./src/components/navigation/StackNavigator.tsx";
import {configFile, outputFile} from "./src/components/jsonFS.ts";
import initApp from "./src/config/initFiles.ts";

function App(): React.JSX.Element {
  RNFS.exists(configFile).then((res) => {
    if(!res){
      console.debug("No config file, init...")
      initApp()
    }
  })
  RNFS.exists(outputFile).then((res) => {
    if(!res){
      console.debug("No output file, init...")
      initApp()
    }
  })

  return (
      <StackNavigator/>
  );
}

export default App;
