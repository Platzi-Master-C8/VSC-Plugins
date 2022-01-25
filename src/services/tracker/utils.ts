import { TextDocumentChangeEvent, TextEditor, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const isStoraged = (fileName: string, storageManager: LocalStorage) => {
  const arr: any[] = storageManager.getValue("GHUserTime")
  return arr.find(item => {
    item.fileName === fileName
  })
}

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

const timeTracker = (e: TextDocumentChangeEvent) => {
  if(e.contentChanges.length){
    console.log("Tracking...")
    let timeEndsSubscription = setTimeout(() => {
      console.log("Your time has finished")
    }, 10000)

    workspace.onDidChangeTextDocument(() => clearTimeout(timeEndsSubscription))
  }
};

export { isStoraged, addRecord, timeTracker }