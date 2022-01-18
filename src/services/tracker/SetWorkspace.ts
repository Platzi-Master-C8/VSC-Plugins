import { Memento, workspace } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const setWorkspace = (storage: Memento) => {
  const workspaceFolder: string | undefined = workspace.name
  const storageManager: LocalStorage = new LocalStorage(storage);
  if(workspaceFolder){
    storageManager.setValue("GHUserWorkspaces", [
      {
        workspace: workspaceFolder,
        date: new Date()
      }
    ])
  }

  console.log("GHUserWorkspaces", storageManager.getValue("GHUserWorkspaces"))
}

export { setWorkspace };