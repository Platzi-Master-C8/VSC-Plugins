import { commands, ExtensionContext } from 'vscode';
import { setToken, setTokenHard } from "./services/data/Token";
import { tracker } from "./services/tracker";

// this method is called when your extension is activated
export function activate(context: ExtensionContext): void {

  // Command for the user to enter the token the very first time
  context.subscriptions.push(commands.registerCommand(
    "gethired-vscode-plugin.enterToken", 
    () => setToken(context)
  ))

  // Command to hard the token to enter again
  context.subscriptions.push(commands.registerCommand(
    "gethired-vscode-plugin.enterTokenHard", 
    () => setTokenHard(context)
  ))
  
  commands.executeCommand("gethired-vscode-plugin.enterToken")
  tracker(context)
}

// this method is called when your extension is deactivated
export function deactivate(): void {

  // Code for the last track time
}
