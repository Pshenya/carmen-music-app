"use client";

import Image from "next/image";
import { useLoadImage } from "@/hooks";
import { Song } from "@/types";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // Player
  }
  return (
    <div
      className="flex items-center gap-x-3 w-full p-2 rounded-md hover:bg-neutral-800/50"
      onClick={handleClick}
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image src={imageUrl || '/images/liked_songs.jpg'} className="object-cover" fill alt="Media"/>
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">
          {data.title}
        </p>
        <p className="text-neutral-400 truncate text-sm">
          {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem
