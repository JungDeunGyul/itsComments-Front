import { create } from "zustand";

export const useDeleteModalStore = create((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (data) => set(() => ({ isDeleteModalOpen: data })),
}));
