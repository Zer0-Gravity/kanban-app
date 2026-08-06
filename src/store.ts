import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalType {
    modalName: string;
    idContainer?: string;
    openModal: (name: string, idContainer?: string) => void;
    closeModal: () => void;
}

interface ThemeType {
    isDark: boolean;
    toggleTheme: () => void;
}

export const useModal = create<ModalType>((set) => ({
    modalName: null,
    idContainer: null,
    openModal: (name, id) => set({ modalName: name, idContainer: id }),
    closeModal: () => set({ modalName: null, idContainer: null }),
}));

export const useTheme = create<ThemeType>()(
    persist(
        (set) => ({
            isDark: false,
            toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
        }),
        { name: "theme-storage" },
    ),
);
