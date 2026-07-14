import { create } from "zustand";

interface ModalType {
    modalName: string;
    openModal: (name: string) => void;
    closeModal: () => void;
}

export const useModal = create<ModalType>((set) => ({
    modalName: null,
    openModal: (name) => set({ modalName: name }),
    closeModal: () => set({ modalName: null }),
}));
