import axios from "axios";
import { window, ExtensionContext } from "vscode";
import { LocalStorage } from "./LocalStorage";

const getUserId = async (ctx: ExtensionContext, msg: string) => {
  const storageManager = new LocalStorage(ctx.globalState);
  const token: string | undefined = await window.showInputBox();

  if(token){
    const options = { headers: {'userKey': token} };
    storageManager.setValue("getHiredToken", token)
  
    await axios.get('https://ms-plugins.herokuapp.com/api/v1/users/id', options)
    .then(function (response) {
      storageManager.setValue("getHiredUserId", response.data)
      window.showInformationMessage(`Token ${msg} successfully`)
    })
    .catch(function (error) {
      window.showInformationMessage("Error saving the token")
      console.log('Error sending data: ', error);
    })
    .then(function () {
      // console.log("Process already finished")
    });
  }else{
    window.showErrorMessage("The token was not saved")
  }
}

const setToken = async (ctx: ExtensionContext) => {
  const storageManager = new LocalStorage(ctx.globalState);
  if(storageManager.getValue("getHiredToken")){
    window.showInformationMessage("You already have a token. To enter a new one please run the command 'Enter Token Hard'")
  }else{
    getUserId(ctx, "saved")
  }
};

const setTokenHard = async (ctx: ExtensionContext) => {
  getUserId(ctx, "re-saved")
};

export { setToken, setTokenHard };