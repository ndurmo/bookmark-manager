const createUserSlice = (set, get) => ({
  user: {},
  setUser: (user) => set(() => ({ user })),
});

export default createUserSlice;
