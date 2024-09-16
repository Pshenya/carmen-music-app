"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLoadImage } from "@/hooks";
import { Artist } from "@/types"
import { formatListeners } from "@/utils/utils";
import { IoIosArrowForward } from "react-icons/io";

interface TopArtistItemProps {
  artist: Artist;
  index: number;
}

const TopArtistItem: React.FC<TopArtistItemProps> = ({ artist, index }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(artist);

  return (
    <div className="group flex items-center w-full rounded-md hover:bg-neutral-800/50 cursor-pointer" onClick={() => router.push(`artist/${artist.id}`)}>
      <h1 className="font-sans text-transparent text-6xl font-black px-3 py-1 rounded-full" style={{ WebkitTextStroke: '2px rgb(61, 61, 61)' }}>
        {index + 1}
      </h1>
      <div className={`flex gap-4 ${(index + 1) === 1 && 'ml-[6px]'}`}>
        <div className="relative flex items-center justify-center w-[60px] h-[60px]">
          <Image src={imageUrl!} fill alt={artist.name} className="object-cover rounded-full"/>
        </div>
        <div>
          <h1 className="text-white text-lg">{artist.name}</h1>
          <p className="text-neutral-400 text-sm group-hover:text-white">{formatListeners(artist.listeners)} listeners</p>
        </div>
      </div>
      <div className="ml-auto pr-2">
        <IoIosArrowForward className="text-neutral-400 text-2xl"/>
      </div>
    </div>
  )
}

export default TopArtistItem
