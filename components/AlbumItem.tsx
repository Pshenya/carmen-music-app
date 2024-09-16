"use client";

import Image from "next/image";
import { Album, Playlist, Song } from "@/types";
import PlayButton from "./PlayButton";
import { useRouter } from "next/navigation";
import { useLoadImage } from "@/hooks";
import { twMerge } from "tailwind-merge";

interface AlbumItemProps {
  data: any;
  showDetails?: boolean;
  className?: string;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ data, showDetails = true, className }) => {
  const router = useRouter();
  const imagePath = useLoadImage(data);
  const url = 'is_public' in data ? `/playlist/${data.id}` : `/album/${data.id}`;

  return (
    <div
      className={twMerge('relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 cursor-pointer hover:bg-neutral-400/15 transition p-3 md:w-56 w-44', className)}
      onClick={() => router.push(url)}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked_songs.jpg'} fill alt="Liked"/>
      </div>
      {showDetails && (
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {data.name}
        </p>
        <p className="text-neutral-400 text-sm w-full pb-4 line-clamp-2" style={{ lineHeight: '1.2rem', margin: 0, padding: 0 }}>
          {data.album_type ? data.album_type : data.description}
        </p>
      </div>
      )}
      {/* <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div> */}
    </div>
  )
}

export default AlbumItem;