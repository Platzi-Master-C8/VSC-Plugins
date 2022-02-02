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
      currentOS = "MacOS"
      break;
    default:
      currentOS = "Web"
  }

  storageManager.setValue("getHiredOS", currentOS)
}

export { setOS }