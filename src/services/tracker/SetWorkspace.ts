import { Memento, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const setWorkspace = (storage: Memento) => {
  const workspaceFolder: string | undefined = workspace.name
  const storageManager: LocalStorage = new LocalStorage(storage);
  // if(workspaceFolder){
  //   storageManager.setValue("getHiredWorkspace", [
  //     {
  //       workspace: workspaceFolder,
  //       date: new Date()
  //     }
  //   ])
  // }
  if(workspaceFolder){
    storageManager.setValue("getHiredWorkspace", workspaceFolder)
  }
}

export { setWorkspace };