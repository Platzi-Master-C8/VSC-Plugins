import { Memento, TextEditor, window, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

import { isStoraged, addRecord } from "./utils";
const regex = new RegExp(/[\.\w]+$/i)

const timeTracker = () => {
  console.log("Tracking...");
};

// // start listening
// var subscription = fsWatcher.onDidDelete(listener);

// // do more stuff

// subscriptions.dispose(); // stop listening

const setUserTime = (storage: Memento, flag: boolean) => {
  // let currentTextEditor: TextEditor | undefined = window.activeTextEditor
  // const storageManager: LocalStorage = new LocalStorage(storage)

  // if(currentTextEditor){
  //   if(flag){
  //     // comprobation to send data to the backend
  //     storageManager.setValue("GHUserTime", [])
  //     addRecord(currentTextEditor, storageManager)
  //   }else{
  //     const storaged = isStoraged(currentTextEditor.document.fileName, storageManager)
  //     if(!storaged){
  //       addRecord(currentTextEditor, storageManager)
  //     }
  //   }
  // }

  let subscription = workspace.onDidChangeTextDocument(timeTracker)
  window.onDidChangeActiveTextEditor(() => subscription.dispose())
};

export { setUserTime }