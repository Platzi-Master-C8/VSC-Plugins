import { setWorkspace } from "./SetWorkspace";
import { setOS } from './SetOS';
import { setLan } from "./SetLan";
import { ExtensionContext } from "vscode";

export const tracker = (context: ExtensionContext) => {
  setWorkspace(context.globalState) // Function called to know the workspace
  setOS(context.globalState) // Function called to know the OS

  setLan(context.globalState, true) // function to trigger the tracking of time
}