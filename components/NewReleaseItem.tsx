"use client";

import Image from "next/image";
import { Album } from "@/types";
import { useRouter } from "next/navigation";
import { useGetSongsByAlbumId, useLoadImage } from "@/hooks";
import { IoIosArrowForward } from "react-icons/io";
import { formatAudioDuration } from "@/utils/utils";

interface NewReleaseItemProps {
  album: Album;
}

const NewReleaseItem: React.FC<NewReleaseItemProps> = ({ album }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(album);
  const { songs } = useGetSongsByAlbumId(album.id);
  const albumDuration = formatAudioDuration(songs.reduce((acc, song) => acc + song.duration, 0), true, false);

  return (
    <div
      className="group flex items-center w-full rounded-md hover:bg-neutral-800/50 cursor-pointer py-2"
      onClick={() => router.push(`album/${album.id}`)}
    >
      <p className="text-primary px-3 py-1 animate-pulse">
        •
      </p>
      <div className="flex gap-4">
        <div className="relative flex items-center justify-center w-[60px] h-[60px]">
          <Image src={imageUrl || '/images/song-placeholder.png'} fill alt={album.name} className="object-cover rounded-sm"/>
        </div>
        <div>
          <h1 className="text-white text-lg truncate w-40">{album.name}</h1>
          <div className="flex items-center gap-2">
            <p className="text-neutral-400 text-sm group-hover:text-white">{album.album_type}, </p>
            <p className="text-neutral-400 text-sm group-hover:text-white">{albumDuration}</p>
          </div>
        </div>
      </div>
      <div className="ml-auto pr-2">
        <IoIosArrowForward className="text-neutral-400 text-2xl"/>
      </div>
    </div>
  )
}

export default NewReleaseItem
