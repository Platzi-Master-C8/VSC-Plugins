import { LocalStorage } from "../data/LocalStorage";

const isStoraged = (fileName: string, storageManager: LocalStorage) => {
  const arr: any[] = storageManager.getValue("GHUserTime")
  return arr.find(item => {
    item.fileName === fileName
  })
}

export { isStoraged }