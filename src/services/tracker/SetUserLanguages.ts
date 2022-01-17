import { window, TextEditor, Memento } from "vscode";
import { LocalStorage } from "../data/LocalStorage";

const setUserLanguages = (storage: Memento, flag: boolean = false) => {
  const storageManager = new LocalStorage(storage);
  const activeEditor: TextEditor | undefined = window.activeTextEditor;
  const regex = new RegExp(/\.[a-z]+$/i)
  let answer: string | RegExpMatchArray | "" | null;


  answer = (activeEditor) ? String(activeEditor.document.uri).match(regex) : "";
  let userLan: any = storageManager.getValue("GHUserLanguages")
  const extension: string | null = answer ? answer[0] : null

  if(flag){
    // Here there must be internet comprobation and send/delete/save data
    storageManager.setValue("GHUserLanguages", {
      value: {
        date: new Date(),
        lenguages: [extension]
      }
    })
  }else{
    let doesExtExists = userLan.value.lenguages.find((item: string) => item === extension)
    if(!doesExtExists){
      userLan.value.lenguages.push(extension)
      storageManager.setValue("GHUserLanguages", userLan)
    }
  }


  // if(userLan && extension){
  //   let flag = userLan.value.lenguages.find((item: string) => item === extension)
  //   if(!flag){
  //     userLan.value.lenguages.push({
  //       lenguageExtension: extension,
  //       date: new Date()
  //     })
  //     storageManager.setValue("GHUserLanguages", userLan)
  //   }
  // }else{
  //   storageManager.setValue("GHUserLanguages", {
  //     value: [
  //       {
  //         lenguageExtension: extension,
  //         date: new Date()
  //       }
  //     ]
  //   })
  // }

  console.log(storageManager.getValue("GHUserLanguages"))
};

export { setUserLanguages };