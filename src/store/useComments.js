import { create } from "zustand";

const useCommentsStore = create((set) => ({
  userComments: {
    createdComments: [],
    receivedComments: [],
    feedComments: [],
  },
  setUserComments: (comments) => set({ userComments: comments }),
}));

export default useCommentsStore;
