"use client";

import { useUser, useAuthModal, useUploadModal, useOnPlay, useSubscribeModal, usePlaylistModal } from "@/hooks";
import { Playlist, Song } from "@/types";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import PlaylistItem from "./Playlists/PlaylistItem";
import DropdownMenu from "./DropdownMenu";
import LikedItem from "./LikedItem";

interface LibraryProps {
  songs: Song[];
  playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({ songs, playlists }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const playlistModal = usePlaylistModal();
  const { user, userDetails, subscription } = useUser();

  const { onPlay } = useOnPlay(songs);

  const handlePlay = (id: string) => {
    return onPlay(id);
  }

  const onUploadClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    if(e.currentTarget.id === "add_playlist") return playlistModal.onOpen();

    return uploadModal.onOpen();
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-base">Your Library</p>
        </div>
        <DropdownMenu onUploadClick={onUploadClick}/>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {user &&
          <LikedItem
            image="/images/liked-songs.png"
            width={48}
            height={48}
            name="Liked songs"
            description="Playlist"
            href="/liked"
            pinned
            className="bg-gradient h-16 ml-2 hover:bg-red-400/10"
          />
        }
        {playlists.map((playlist) => (
          <div key={playlist.id} className="rounded-md hover:bg-neutral-300/10 transition cursor-pointer">
            <PlaylistItem data={playlist} user={userDetails}/>
          </div>
        ))}
        {songs.map((song) => (
          <div key={song.id} onClick={() => handlePlay(song.id)} className="rounded-md hover:bg-neutral-300/10 transition cursor-pointer">
            <MediaItem data={song} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Library
