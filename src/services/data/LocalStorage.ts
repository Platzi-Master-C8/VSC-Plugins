"use strict";

import { Memento } from "vscode";

class LocalStorage{
  constructor(private storage: Memento){}

  public getValue<T>(key: string): T{
    return this.storage.get<T>(key, <T><any>"")
  }

  public setValue<T>(key: string, value: T){
    this.storage.update(key, value)
  }
}

export { LocalStorage };