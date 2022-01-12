import * as vscode from 'vscode';
import { commands, ExtensionContext, window, workspace } from 'vscode';
import { showInformation } from './services/ShowInformation';
import { LocalStorage } from "./services/data/LocalStorage";

// this method is called when your extension is activated
export function activate(context: ExtensionContext): void {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let cmd = commands.registerCommand(
    'gethired-vscode-plugin.showInformation',
    showInformation
  );

  context.subscriptions.push(cmd);

  // const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  // const regex = new RegExp(/\.[a-z]+$/i)
  // let answer: string;
  // if(!activeEditor){
  // 	answer = "No active editor"
  // }else{
    // answer = String(activeEditor.document.uri)
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
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
