import { create } from "zustand"

interface PlaylistModalStore {
  isOpen: boolean;
  playlistId: string | null;
  name: string;
  description: string;
  imageUrl: string | null;
  action_type: 'create' | 'update';
  artistName: string | null;
  onOpen: () => void;
  onClose: () => void;
  setValues: (id: string, name: string, description: string, imageUrl: string, action_type: 'create' | 'update', artistName: string) => void;
  resetValues: () => void;
}

const usePlaylistModal = create<PlaylistModalStore>((set) => ({
  isOpen: false,
  playlistId: null,
  name: '',
  description: '',
  imageUrl: null,
  action_type: 'create',
  artistName: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setValues: (id, name, description, imageUrl, action_type, artistName) => set({ playlistId: id, name, description, imageUrl, action_type, artistName }),
  resetValues: () => set({ playlistId: null, name: '', description: '', artistName: '', imageUrl: null, action_type: 'create' }),
}));

export default usePlaylistModal;
