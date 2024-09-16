"use client";

import Image from "next/image";
import { Playlist, UserDetails } from "@/types";
import { useRouter } from "next/navigation";
import { useLoadImage } from "@/hooks";

interface PlaylistItemProps {
  data: Playlist;
  user: UserDetails | null;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ data: playlist, user }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(playlist);

  return (
    <div
      className="flex items-center gap-x-3 md:w-full p-2 rounded-md"
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/playlist/${playlist.id}`)
      }}
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image src={imageUrl || '/images/song-placeholder.png'} className="object-cover" fill alt="Media"/>
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate">
          {playlist.name}
        </p>
        <p
          className="text-neutral-400 truncate text-sm w-fit"
        >
          Playlist • {user?.username}
        </p>
      </div>
    </div>
  )
}

export default PlaylistItem
