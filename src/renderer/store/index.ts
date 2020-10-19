import {Steam} from "./Steam";
import Settings from "./Settings";

export const storesInternal = {
  steam: new Steam(),
  settings: new Settings()
};


console.log(storesInternal)
// @ts-ignore
window.stores = storesInternal;
export const useStores = () => storesInternal;
