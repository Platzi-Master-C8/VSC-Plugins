import { commands, ExtensionContext } from 'vscode';
import { getToken } from "./services/data/Token";
import { tracker } from "./services/tracker";

// this method is called when your extension is activated
export function activate(context: ExtensionContext): void {

  // Command for the user to enter the token whener he/she wants
  context.subscriptions.push(commands.registerCommand(
    "gethired-vscode-plugin.enterToken", 
    () => getToken(context.globalState)
  ))

  tracker(context)
}

// this method is called when your extension is deactivated
export function deactivate(): void {

  // Code for the last track time
}
