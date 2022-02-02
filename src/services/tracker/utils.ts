import { performance } from "perf_hooks";
import { TextDocumentChangeEvent, TextEditor, window, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const regexp = new RegExp(/[\w]+\.[a-z]{2,4}/)
let t0:number, t1:number, flag:boolean = true, firstOne:any, lastOne:any

const getFileName = (uri:string | undefined) => {
  if(uri){
    const result: any = regexp.exec(uri)
    return result[0]
  }
  return false
}

const isStoraged = (filename: string | undefined, storageManager: LocalStorage) => {
  filename = getFileName(filename)
  const arr: any[] = storageManager.getValue("getHiredLan")
  return arr.findIndex(item => getFileName(item.fileName) === filename)
}

const preserveData = (instance: TextEditor | undefined, storageManager: LocalStorage, dev: number) => {
  const arr: any[] = storageManager.getValue("getHiredLan")
  const index = isStoraged(instance?.document.fileName, storageManager)
  if(index > -1){
    arr[index].time += dev
    arr[index].stamps.push({
      start: firstOne,
      end: lastOne
    })
  }else{
    arr.push({
      lan: instance?.document.languageId,
      fileName: getFileName(instance?.document.fileName),
      workspace: storageManager.getValue("getHiredWorkspace"),
      os: storageManager.getValue("getHiredOS"),
      time: dev,
      stamps: [
        {
          start: firstOne,
          end: lastOne
        }
      ]
    })
  }

  console.log(arr)
  storageManager.setValue("getHiredLan", arr)
}

const timeTracker = (e: TextDocumentChangeEvent, keydowns: number, storageManager: LocalStorage) => {
  if(e.contentChanges.length){
    let currentTextEditor: TextEditor | undefined = window.activeTextEditor
    if(keydowns > 0 && flag){
      t0 = performance.now();
      firstOne = new Date()
      flag = false
      // console.log("Tracking... " + currentTextEditor?.document.fileName)
    }

    const timeEndsSubscription = setTimeout(() => {
      t1 = performance.now()
      flag = true
      lastOne = new Date()
      preserveData(currentTextEditor, storageManager, Math.round((t1 - t0)/1000))
      // console.log(`Time ended, you were coding ${Math.round((t1 - t0)/1000)} seconds`)
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
        lastOne = new Date()
        preserveData(currentTextEditor, storageManager, Math.round((t1 - t0)/1000))
        // console.log(`Time cutted, you were coding ${Math.round((t1 - t0)/1000)} seconds`)
        onTypeListener.dispose()
        clearTimeout(timeEndsSubscription)
      }else if(e){
        clearTimeout(timeEndsSubscription)
      }
    })
  }
};

export { isStoraged, timeTracker }