/*
  Уникальный пул localStorage\sessionStorage
  (!) Не пересекается с другим проектом
  (!) Не пересекаются пользователи между собой --при условии использования updateStoragesWithUniqKey
 */
import storage from "../../utils/storage";

const {project_id: projectId} = require("./../../package");

const keys = [
  {name: "shownModals"},
  {
    name: "tutorial",
    storageStr: `tutorial_user_`,
    storageType: undefined
  },
]

export const STORAGES = {};
let updated = false;

keys.forEach(({name, storageType, storageStr}) => {
  STORAGES[name] = new storage(storageStr || name, null, storageType);
});


export function updateStoragesWithUniqKey(userUid) {
  if (updated) return;
  updated = true;
  const uniqProjectKey = projectId;
  keys.forEach(({name, storageType}) => {
    STORAGES[name].setPostfix(`_${userUid}_${uniqProjectKey}`);
  });
}

export const shownModals = STORAGES.shownModals;
export const tutorialStorage = STORAGES.tutorial;
