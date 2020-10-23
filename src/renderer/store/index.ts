import {Steam} from "./Steam";
import Settings from "./Settings";
import {Game} from "./Game";

const steam = new Steam();
const settings = new Settings()
export const storesInternal = {
  steam,
  settings: settings,
  game: new Game(steam, settings)
};


console.log(storesInternal)
// @ts-ignore
window.stores = storesInternal;
export const useStores = () => storesInternal;
