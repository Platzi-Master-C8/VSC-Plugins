import { window, Memento } from "vscode";
import { LocalStorage } from "./LocalStorage";


const getToken = async (ctx: Memento) => {
  // ctx = context.globalState
  const storageManager = new LocalStorage(ctx);
  const token: string | undefined = await window.showInputBox()
  if(token){
    // TODO => Set the correct logic to accept the token
    storageManager.setValue("GH_TOKEN", {Token: token})
    window.showInformationMessage("Token saved successfully")
  }
};

export { getToken };