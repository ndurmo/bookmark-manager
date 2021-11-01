import create from "zustand";

import createUserSlice from "./slices/create-user-slice";

const useStore = create((set, get) => ({
  ...createUserSlice(set, get),
}));

export default useStore;
