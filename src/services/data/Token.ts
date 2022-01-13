import { window, Memento } from "vscode";
import { LocalStorage } from "./LocalStorage";


const getToken = async (ctx: Memento) => {
  // ctx = context.globalState
  const storageManager = new LocalStorage(ctx);
  const token: string | undefined = await window.showInputBox()
  if(token){
    storageManager.setValue("TOKEN", token)
    window.showInformationMessage("Token saved successfully")
  }
};

export { getToken };