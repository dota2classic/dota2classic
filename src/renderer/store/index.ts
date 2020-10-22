import {Steam} from "./Steam";
import Settings from "./Settings";
import {Game} from "./Game";

const steam = new Steam()
export const storesInternal = {
  steam,
  settings: new Settings(),
  game: new Game(steam)
};


console.log(storesInternal)
// @ts-ignore
window.stores = storesInternal;
export const useStores = () => storesInternal;
