import { performance } from "perf_hooks";
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

let t0:number, t1:number, flag:boolean = true

const timeTracker = (e: TextDocumentChangeEvent, keydowns: number) => {
  if(e.contentChanges.length){
    let currentTextEditor: TextEditor | undefined = window.activeTextEditor
    if(keydowns > 0 && flag){
      console.log("Tracking... " + currentTextEditor?.document.fileName)
      t0 = performance.now();
      flag = false
    }

    const timeEndsSubscription = setTimeout(() => {
      t1 = performance.now()
      flag = true
      console.log(`Time ended, you were coding ${Math.round((t1 - t0)/1000)} seconds`)
    }, 10000)

    const onTypeListener = workspace.onDidChangeTextDocument((e) => {
      if(e.contentChanges.length){
        clearTimeout(timeEndsSubscription)
      }
    })

    window.onDidChangeActiveTextEditor((e) => {
      if(!flag && e){
        flag = true
        t1 = performance.now()
        console.log(`Time cutted, you were coding ${Math.round((t1 - t0)/1000)} seconds`)
        onTypeListener.dispose()
        clearTimeout(timeEndsSubscription)
      }else if(e){
        clearTimeout(timeEndsSubscription)
      }
    })
  }
};

export { isStoraged, addRecord, timeTracker }