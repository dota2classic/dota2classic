import {Steam} from "./Steam";
import Settings from "./Settings";

export const stores = {
  steam: new Steam(),
  settings: new Settings()
};

export const useStores = () => stores;
