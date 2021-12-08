import { commands, ExtensionContext, window, workspace } from 'vscode';
import { showInformation } from './services/ShowInformation';

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
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
