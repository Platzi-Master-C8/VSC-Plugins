import { window, ExtensionContext } from "vscode";
import { LocalStorage } from "./LocalStorage";

const setToken = async (ctx: ExtensionContext) => {
  const storageManager = new LocalStorage(ctx.globalState);
  if(!storageManager.getValue("getHiredToken")){
    const token: string | undefined = await window.showInputBox()
    if(token){
      storageManager.setValue("getHiredToken", token)
      window.showInformationMessage("Token saved successfully")
    }else{
      window.showInformationMessage("Get Hired Code Tracker needs your token to work properly. Once you got it, run the command 'Enter Token'")
    }
  }
};

const setTokenHard = async (ctx: ExtensionContext) => {
  const storageManager = new LocalStorage(ctx.globalState);
  const token: string | undefined = await window.showInputBox()
  storageManager.setValue("getHiredToken", token)
  window.showInformationMessage("Token re-saved successfully")
};

export { setToken, setTokenHard };