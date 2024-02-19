import { create } from "zustand";

const useCommentsStore = create((set) => ({
  userComments: {
    createdComments: [],
    receivedComments: [],
  },
  setUserComments: (comments) => set({ userComments: comments }),
}));

export default useCommentsStore;
