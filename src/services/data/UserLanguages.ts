import { window, TextEditor, Memento } from "vscode";
import { LocalStorage } from "./LocalStorage";

const userLanguages = (storage: Memento) => {
  const storageManager = new LocalStorage(storage);
  // storageManager.setValue("GHUserLanguages", null)
  const activeEditor: TextEditor | undefined = window.activeTextEditor;
  const regex = new RegExp(/\.[a-z]+$/i)
  let answer: string | RegExpMatchArray | "" | null;


  answer = (activeEditor) ? String(activeEditor.document.uri).match(regex) : "";
  let userLan: any = storageManager.getValue("GHUserLanguages")
  const extension: string | null = answer ? answer[0] : null

  if(userLan && extension){
    let flag = userLan.value.find((item: any) => item.lenguageExtension === extension)
    if(!flag){
      userLan.value.push({
        lenguageExtension: extension,
        date: new Date()
      })
      storageManager.setValue("GHUserLanguages", userLan)
    }
  }else{
    storageManager.setValue("GHUserLanguages", {
      value: [
        {
          lenguageExtension: extension,
          date: new Date()
        }
      ]
    })
  }

  console.log(storageManager.getValue("GHUserLanguages"))

  // vscode.workspace.onDidChangeWorkspaceFolders(() => doSomething(readUri))
};

export { userLanguages };