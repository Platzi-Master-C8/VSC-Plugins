# gethired-vscode-plugin

<center>
  <i>
    This awesome plugin for vscode allows you to track the time you spend by making some magic in your projects
  </i>
</center>

---

## Stack used
* TypeScript
* Webpack
* ESLint
* Prettier

---
## How to run
Running the plugin is as simple as clicking on the `Run` menu and click on the `Start debugging` item.

Or, if you prefer, you can see the shortcut in the item mentioned above, which is some cases is by pressing F5 key.

---
## How to contribute
Glad to see you are interested in contributing to this project, but we have some easy rules to follow before.

First of all, remember to check the Integration dashboard on our notion and find the pending tasks of Plugins section on it:
* Simply, move one of them to the "In Progress" column
* Clone the repository and create a new branch with the name of the task
* Once you'd implemented the task in the code, create a pull request and the leader of the squad will review and approve your changes into the main branch.
* Once the pull request is approved, the task will be moved to the "Done" column
---

The pattern we follow in the folder structure is basically the following:
* `src`: the source code of the plugin
* `test/test`: the unit tests of every functions created in `services` folder
* `src/services`: this folder contains the commands that we need to define either in the package.json and the extension.ts file 
  * we suggest, put the name of the services files by using PascalCase, but the name of the function associated on it, should be camelCase.
* `package.json`: this is the index of every commands used for the plugin
* `src/extension.ts`: this is the main file of the plugin, it contains the commands defined in the package.json file.
---

