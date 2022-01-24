import { commands, ExtensionContext, window, TextEditor } from 'vscode';
import { showInformation } from './services/ShowInformation';
import { getToken } from "./services/data/Token";
import { setUserLanguages } from "./services/tracker/SetUserLanguages";
import { setWorkspace } from "./services/tracker/SetWorkspace";
import { setOS } from './services/tracker/SetOS';
import { setUserTime } from './services/tracker/SetUserTime';

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

  // This function will be called to know the workspace
  setWorkspace(context.globalState)

  // This function will be called to know the operative system
  setOS(context.globalState)

  // This function starts tracking the user time
  setUserTime()

  // This action triggers an action everytime the user moves tabs
  window.onDidChangeActiveTextEditor((editor: TextEditor | undefined) => {
    if(editor){
      setUserLanguages(context.globalState)
      setUserTime()
    }
  })
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
