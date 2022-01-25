import { TextDocumentChangeEvent, TextEditor, window, workspace } from "vscode";
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
    workspace: workspace.name,
    time: 0
  }
  const currentUserTime: any[] = storageManager.getValue("GHUserTime")
  currentUserTime.push(record)
  storageManager.setValue("GHUserTime", currentUserTime)
}

const timeTracker = (e: TextDocumentChangeEvent) => {
  let currentTextEditor: TextEditor | undefined = window.activeTextEditor
  if(e.contentChanges.length){
    console.log("Tracking... " + currentTextEditor?.document.fileName)
    const timeEndsSubscription = setTimeout(() => {
      console.log("Your time has finished")
    }, 10000)

    const onTypeListener = workspace.onDidChangeTextDocument((e) => {
      if(e.contentChanges.length){
        clearTimeout(timeEndsSubscription)
      }
    })

    window.onDidChangeActiveTextEditor((e) => {
      clearTimeout(timeEndsSubscription)
      onTypeListener.dispose()
    })
  }
};

export { isStoraged, addRecord, timeTracker }