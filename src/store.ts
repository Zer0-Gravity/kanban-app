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
    isChecked: boolean;
    toggleTheme: () => void;
}

interface SidebarType {
    isCollapse: boolean;
    toggleSidebar: () => void;
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
            isChecked: false,
            toggleTheme: () =>
                set((state) => ({
                    isDark: !state.isDark,
                    isChecked: !state.isChecked,
                })),
        }),
        { name: "theme-storage" },
    ),
);

export const useCollapse = create<SidebarType>()(
    persist(
        (set) => ({
            isCollapse: false,
            toggleSidebar: () =>
                set((state) => ({ isCollapse: !state.isCollapse })),
        }),
        { name: "sidebar-storage" },
    ),
);
