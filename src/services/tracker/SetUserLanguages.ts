import { window, TextEditor, Memento } from "vscode";
import { LocalStorage } from "../data/LocalStorage";
const regex = new RegExp(/\.[a-z]+$/i)

const setUserLanguages = (storage: Memento, flag: boolean = false) => {
  const storageManager: LocalStorage = new LocalStorage(storage);
  const activeEditor: TextEditor | undefined = window.activeTextEditor;
  let answer: string | RegExpMatchArray | "" | null;


  answer = (activeEditor) ? String(activeEditor.document.uri).match(regex) : "";
  let userLan: any = storageManager.getValue("GHUserLanguages")
  const extension: string | null = answer ? answer[0] : null

  if(flag){
    // Here there must be internet comprobation and send/delete/save data
    const GHUserLanArr: string[] = []
    let GHUserLan = {
      value: {
        date: new Date(),
        languages: GHUserLanArr
      }
    }
    if(extension){
      GHUserLan.value.languages.push(extension)
    }
    storageManager.setValue("GHUserLanguages", GHUserLan)
  }else{
    let doesExtExists = userLan.value.languages.find((item: string) => item === extension)
    if(!doesExtExists){
      userLan.value.languages.push(extension)
      storageManager.setValue("GHUserLanguages", userLan)
    }
  }

  // console.log("GHUserLanguages", storageManager.getValue("GHUserLanguages"))
};

export { setUserLanguages };