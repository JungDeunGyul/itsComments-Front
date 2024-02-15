import { create } from "zustand";

export const useDeleteModalStore = create((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (data) => set(() => ({ isDeleteModalOpen: data })),
}));

export const useAddModalStore = create((set) => ({
  isAddModalOpen: false,
  setIsAddModalOpen: (data) => set(() => ({ isAddModalOpen: data })),
}));
