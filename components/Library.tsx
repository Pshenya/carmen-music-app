"use client";

import { useUser, useAuthModal, useUploadModal, useOnPlay, useSubscribeModal } from "@/hooks";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import ListItem from "./ListItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-base">Your Library</p>
        </div>
        <AiOutlinePlus className="text-neutral-400 cursor-pointer hover:text-white transition" size={20} onClick={onClick} />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        <ListItem image="/images/liked_songs.jpg" name="Liked songs" href="liked" className="bg-transparent h-16 ml-2"/>
        {songs.map((song) => (
          <MediaItem key={song.id} data={song} onClick={(id: string) => onPlay(id)} />
        ))}
      </div>
    </div>
  )
}

export default Library
