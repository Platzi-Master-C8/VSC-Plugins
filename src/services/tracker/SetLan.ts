import { Memento, TextEditor, window, workspace, TextDocumentChangeEvent } from "vscode";
import { LocalStorage } from "../data/LocalStorage";
import { isStoraged, timeTracker } from "./utils";

const regex = new RegExp(/[\.\w]+$/i)
export const setLan = (storage: Memento, flag: boolean) => {
  let keydowns: number = 0
  let currentTextEditor: TextEditor | undefined = window.activeTextEditor
  const storageManager: LocalStorage = new LocalStorage(storage)

  if(currentTextEditor){
    const fileName = currentTextEditor.document.fileName

    if(flag){
      // comprobation to send data to the backend
      storageManager.setValue("getHiredLan", [])
      // addRecord(currentTextEditor, storageManager)
    }

    const subscription = workspace.onDidChangeTextDocument((e:TextDocumentChangeEvent) => {
      if(e.contentChanges.length){
        keydowns += 1
        timeTracker(e, keydowns, storageManager)
      }
    })

    window.onDidChangeActiveTextEditor(() => {
      subscription.dispose()
      setLan(storage, false)
    })
  }

};