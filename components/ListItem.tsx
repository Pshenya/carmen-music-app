"use client";

import { useLoadImage } from "@/hooks";
import { Album, Artist, Playlist, Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface ListItemProps {
  data: Artist | Album | Playlist;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ data, className }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);
  let type;

  const onClick = () => {
    if ('listeners' in data) {
      type = 'artist';
    } else if ('album_type' in data) {
      type = 'album';
    } else {
      type = 'playlist';
    }
    // Add auth before pushing to href
    router.push(`${type}/${data.id}`);
  }

  return (
    <button
      className={twMerge('relative group flex items-center rounded-md overflow-hidden gap-x-3 bg-neutral-500/20 hover:bg-neutral-300/20 transition-all duration-300 pr-4 mr-1', className)}
      onClick={onClick}
    >
      <div className="min-h-[52px] md:min-h-[64px] min-w-[52px] md:min-w-[64px] relative">
        <Image className="object-cover" fill src={imageUrl || '/images/song-placeholder.png'} alt={data.name}/>
      </div>
      <div className="flex flex-col">
        <p className="text-sm md:text-base font-medium text-left truncate">{data.name}</p>
      </div>
      <div className="absolute transition-all opacity-0 rounded-full flex items-center justify-center bg-primary p-4 drop-shadow-md right-2 md:group-hover:opacity-100 md:hover:scale-110">
        <FaPlay className="text-black"/>
      </div>
    </button>
  )
}

export default ListItem
