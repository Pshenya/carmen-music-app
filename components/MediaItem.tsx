"use client";

import Image from "next/image";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useLoadImage } from "@/hooks/useLoadImage";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  hideImage?: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick, hideImage = false }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // Player
  }
  return (
    <div
      className="flex items-center gap-x-3 md:w-full p-2 rounded-md hover:bg-neutral-800/50"
      onClick={handleClick}
    >
      <div className={`${hideImage && 'hidden'} relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden`}>
        <Image src={imageUrl || '/images/liked_songs.jpg'} className="object-cover" fill alt="Media"/>
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">
          {data.title}
        </p>
        <p
          className="text-neutral-400 truncate text-sm cursor-pointer hover:underline w-fit"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/artist/${data.artist_id}`)
          }}
        >
          {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem
