import {Steam} from "./Steam";
import Settings from "./Settings";
import {Game} from "./Game";

export const storesInternal = {
  steam: new Steam(),
  settings: new Settings(),
  game: new Game()
};


console.log(storesInternal)
// @ts-ignore
window.stores = storesInternal;
export const useStores = () => storesInternal;
