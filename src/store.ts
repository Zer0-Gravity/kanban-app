import { create } from "zustand";

interface ModalType {
    modalName: string;
    idContainer?: string;
    openModal: (name: string, idContainer?: string) => void;
    closeModal: () => void;
}

export const useModal = create<ModalType>((set) => ({
    modalName: null,
    idContainer: null,
    openModal: (name, id) => set({ modalName: name, idContainer: id }),
    closeModal: () => set({ modalName: null, idContainer: null }),
}));
