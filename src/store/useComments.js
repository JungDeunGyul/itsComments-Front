import { create } from "zustand";

const useCommentsStore = create((set) => ({
  userComments: {
    createdComments: [],
    feedComments: [],
    receivedComments: [],
  },
  setUserComments: (comments) => set({ userComments: comments }),
}));

export default useCommentsStore;
