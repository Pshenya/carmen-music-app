"use client";

import Image from "next/image";
import { Album, Song } from "@/types";
import PlayButton from "./PlayButton";
import { useLoadImage } from "@/hooks/useLoadImage";
import { useRouter } from "next/navigation";

interface AlbumItemProps {
  album: Album;
  // songs: Song[];
  // onClick: (id: string) => void;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
  const router = useRouter();
  const imagePath = useLoadImage(album);

  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      onClick={() => router.push(`/album/${album.id}`)}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked_songs.jpg'} fill alt="Liked"/>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {album.name}
        </p>
        <p className="text-neutral-400 text-sm w-full pb-4 truncate">
          {album.album_type}
        </p>
      </div>
      {/* <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div> */}
    </div>
  )
}

export default AlbumItem;