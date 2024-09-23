import { create } from "zustand"

interface ArtistBioModalStore {
  isOpen: boolean;
  name: string;
  imageUrl: string | null;
  listeners: number;
  bio: string;
  rank: number;
  onOpen: () => void;
  onClose: () => void;
  setValues: (name: string, imageUrl: string, listeners: number, bio: string, rank: number) => void;
}

const useArtistModal = create<ArtistBioModalStore>((set) => ({
  isOpen: false,
  name: '',
  imageUrl: '',
  listeners: 0,
  bio: '',
  rank: 0,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setValues: (name, imageUrl, listeners, bio, rank) => set({ name, imageUrl, listeners, bio, rank }),
}));

export default useArtistModal;
