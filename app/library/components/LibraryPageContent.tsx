"use client";

import { Playlist, Song } from "@/types";
import { useAuthModal, useOnPlay, usePlayer, usePlaylistModal, useSubscribeModal, useUploadModal, useUser } from "@/hooks";
import LikedItem from "@/components/LikedItem";
import PlaylistItem from "@/components/Playlists/PlaylistItem";
import MediaItem from "@/components/MediaItem";
import DropdownMenu from "@/components/DropdownMenu";

interface LibraryPageContentProps {
  songs: Song[];
  playlists: Playlist[];
}

const LibraryPageContent: React.FC<LibraryPageContentProps> = ({ songs, playlists }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const playlistModal = usePlaylistModal();
  const { user, userDetails, subscription } = useUser();
  const player = usePlayer();

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
    <div className={`flex flex-col relative ${player.activeId ? 'mb-[154px] md:mb-[90px]' : 'mb-16 md:mb-0'}`}>
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
        <button className="px-3 py-1 rounded-lg bg-neutral-800/30 border border-neutral-500 flex items-center justify-center transition">
            Playlists
          </button>
          <button className="px-3 py-1 rounded-lg bg-neutral-800/30 border border-neutral-500 flex items-center justify-center transition">
            Songs
          </button>
          <button className="px-3 py-1 rounded-lg bg-neutral-800/30 border border-neutral-500 flex items-center justify-center transition">
            Albums
          </button>
        </div>
        <DropdownMenu onUploadClick={onUploadClick}/>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 text-lg h-full">
        {user &&
          <LikedItem
            image="/images/liked-songs.png"
            width={58}
            height={58}
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

export default LibraryPageContent
