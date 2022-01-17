import { commands, ExtensionContext, window, workspace, TextEditor } from 'vscode';
import { showInformation } from './services/ShowInformation';
import { getToken } from "./services/data/Token";
import { setUserLanguages } from "./services/tracker/SetUserLanguages";

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

  // Command for the user to enter the token whener he/she wants
  context.subscriptions.push(commands.registerCommand(
    "gethired-vscode-plugin.enterToken", 
    () => getToken(context.globalState)
  ))

  // This function will be called onStartupFinished
  setUserLanguages(context.globalState, true)

  // This action triggers an action everytime the user moves tabs
  window.onDidChangeActiveTextEditor((editor: TextEditor | undefined) => {
    if(editor){
      setUserLanguages(context.globalState)
    }
  })
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
