import { Memento, TextEditor, window } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

import { isStoraged } from "./utils";
const regex = new RegExp(/[\.\w]+$/i)

const addRecord = (instance: TextEditor, storageManager: LocalStorage) => {
  const record = {
    languageId: instance.document.languageId,
    fileName: instance.document.fileName,
    time: 0
  }
  const currentUserTime: any[] = storageManager.getValue("GHUserTime")
  currentUserTime.push(record)
  storageManager.setValue("GHUserTime", currentUserTime)
}

const setUserTime = (storage: Memento, flag: boolean) => {
  let currentTextEditor: TextEditor | undefined = window.activeTextEditor
  const storageManager: LocalStorage = new LocalStorage(storage)

  if(currentTextEditor){
    if(flag){
      // comprobation to send data to the backend
      storageManager.setValue("GHUserTime", [])
      addRecord(currentTextEditor, storageManager)
    }else{
      const storaged = isStoraged(currentTextEditor.document.fileName, storageManager)
      if(!storaged){
        addRecord(currentTextEditor, storageManager)
      }
    }
  }

  console.log("GHUserTime", storageManager.getValue("GHUserTime"))
  // workspace.onDidChangeTextDocument((e) => {
};

export { setUserTime }