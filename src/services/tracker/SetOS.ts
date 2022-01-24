import { Memento } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const setOS = (storage: Memento) => {
  const storageManager: LocalStorage = new LocalStorage(storage)
  let currentOS: string;

  switch(process.platform){
    case "win32":
      currentOS = "Windows"
      break;
    case "linux":
      currentOS = "Linux"
      break;
    case "darwin":
      currentOS = "iOS"
      break;
    default:
      currentOS = "Web"
  }

  storageManager.setValue("GHOperativeSystem", currentOS)
  console.log("GHOperativeSystem:", storageManager.getValue("GHOperativeSystem"))
}

export { setOS }