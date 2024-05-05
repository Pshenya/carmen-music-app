import { create } from "zustand"

interface RightSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRightSidebar = create<RightSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRightSidebar;
