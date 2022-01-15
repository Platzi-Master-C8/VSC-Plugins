import { window } from "vscode";

const userLanguages = () => {
  window.showInformationMessage("Hi");
  // const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  // const regex = new RegExp(/\.[a-z]+$/i)
  // let answer: string;
  // if(!activeEditor){
  // 	answer = "No active editor"
  // }else{
  //   answer = String(activeEditor.document.uri)
  // }

  // let uri = {
  // 	value: answer
  // }
  // let storageManager = new LocalStorage(context.globalState);
  // storageManager.setValue("URI", uri)

  // const readUri = storageManager.getValue("URI")
  // console.log(readUri)
  // vscode.window.showInformationMessage(answer)
  // vscode.workspace.onDidChangeWorkspaceFolders(() => doSomething(readUri))
};

export { userLanguages };