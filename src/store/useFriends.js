import { create } from "zustand";

const useFriendsStore = create((set) => ({
  friendsList: [],
  setFriendsList: (data) => set(() => ({ friendsList: data })),
}));

export default useFriendsStore;
