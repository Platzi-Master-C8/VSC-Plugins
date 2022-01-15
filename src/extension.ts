import * as vscode from 'vscode';
import { commands, ExtensionContext, window, workspace } from 'vscode';
import { showInformation } from './services/ShowInformation';
import { getToken } from "./services/data/Token";
import { userLanguages } from "./services/data/UserLanguages";
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

  // Command for the user to enter the token whener he/she wants
  context.subscriptions.push(commands.registerCommand(
    "gethired-vscode-plugin.enterToken", 
    () => getToken(context.globalState)
  ))

  // This function will be called onStartupFinished
  userLanguages()

  // This action triggers an action everytime the user moves tabs
  window.onDidChangeActiveTextEditor((e: vscode.TextEditor | undefined) => {
    userLanguages()
  })
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
