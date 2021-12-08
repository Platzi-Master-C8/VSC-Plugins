import { window } from 'vscode';

export const showInformation = () => {
  // The code you place here will be executed every time your command is executed
  // Display a message box to the user
  window.showInformationMessage(
    'Congratulations, your extension "gethired-vscode-plugin" is now active!'
  );
};
