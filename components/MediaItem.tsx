"use client";

import Image from "next/image";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useLoadImage } from "@/hooks";

interface MediaItemProps {
  data: Song;
  activeId?: string;
  hideImage?: boolean;
  artistPageList?: boolean
  truncate?: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, activeId, hideImage, artistPageList = false, truncate }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);

  return (
    <div
      className="flex items-center gap-x-3 md:w-full p-2 rounded-md"
    >
      <div className={`${hideImage && 'hidden'} relative rounded-md min-h-[58px] md:min-h-[48px] min-w-[58px] md:min-w-[48px] overflow-hidden`}>
        <Image src={imageUrl || '/images/song-placeholder.png'} className="object-cover" fill alt="Media"/>
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className={`${activeId === data.id ? 'text-primary' : 'text-white'} truncate`}>
          {truncate ?
            data.title.length > 30 ? data.title.substring(0, 20) + '...' : data.title
            :
            data.title
          }

        </p>
        <p
          className="text-neutral-400 truncate text-sm cursor-pointer hover:underline w-fit"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/artist/${data.artist_id}`)
          }}
        >
          {artistPageList ? data.streams : data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem
