import { window, TextEditor } from "vscode";

const userLanguages = () => {
  const activeEditor: TextEditor | undefined = window.activeTextEditor;
  const regex = new RegExp(/\.[a-z]+$/i)
  let answer: string | RegExpMatchArray | "" | null;
  answer = (activeEditor) ? String(activeEditor.document.uri).match(regex) : "";
  window.showInformationMessage(answer?.length ? answer[0] : "")
  // let uri = {
  // 	value: answer
  // }
  // let storageManager = new LocalStorage(context.globalState);
  // storageManager.setValue("URI", uri)

  // const readUri = storageManager.getValue("URI")
  // console.log(readUri)
  // vscode.
  // vscode.workspace.onDidChangeWorkspaceFolders(() => doSomething(readUri))
};

export { userLanguages };