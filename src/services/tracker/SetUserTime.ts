import { TextEditor, window, workspace } from "vscode";

const setUserTime = () => {
  const currentTextEditor: TextEditor | undefined = window.activeTextEditor
  if(currentTextEditor){
    workspace.onDidChangeTextDocument((e) => {
      if(e.contentChanges.length){
        console.log("onDidChangeTextDocument:", e)
      }
    })
  }
};

export { setUserTime }