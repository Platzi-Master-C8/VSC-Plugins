import { Memento, TextEditor, window, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

import { isStoraged, addRecord, timeTracker } from "./utils";
const regex = new RegExp(/[\.\w]+$/i)

const setUserTime = (storage: Memento, flag: boolean) => {
  let currentTextEditor: TextEditor | undefined = window.activeTextEditor
  const storageManager: LocalStorage = new LocalStorage(storage)

  if(currentTextEditor){
    const fileName = currentTextEditor.document.fileName
    if(flag){
      // comprobation to send data to the backend
      storageManager.setValue("GHUserTime", [])
      addRecord(currentTextEditor, storageManager)
    }else{
      const storaged = isStoraged(fileName, storageManager)
      if(!storaged){
        addRecord(currentTextEditor, storageManager)
      }
    }

    const subscription = workspace.onDidChangeTextDocument(timeTracker)
    window.onDidChangeActiveTextEditor(() => subscription.dispose())
  }

};

export { setUserTime }