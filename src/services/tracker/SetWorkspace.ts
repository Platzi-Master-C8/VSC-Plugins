import { Memento, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const setWorkspace = (storage: Memento) => {
  const workspaceFolder = workspace.workspaceFolders
  const storageManager = new LocalStorage(storage);
  if(workspaceFolder){
    storageManager.setValue("GHUserWorkspaces", [
      {
        workspace: workspaceFolder[0].name,
        date: new Date()
      }
    ])
  }

  console.log(storageManager.getValue("GHUserWorkspaces"))
}

export { setWorkspace };