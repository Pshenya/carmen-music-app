"use client";

import Image from "next/image";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useLoadImage } from "@/hooks";
import LikeButton from "./ui/LikeButton";
import PlayButton from "./PlayButton";
import { IoPlaySharp } from "react-icons/io5";
import Lottie from "lottie-react";
import lottie_musicPlaying from "@/public/assets/animations/lottie_musicPlaying.json";

interface MediaListItemProps {
  data: Song;
  activeId?: string;
  hideImage?: boolean;
  showDetails?: boolean;
  truncate?: boolean;
  onClick: () => void;
}

const MediaListItem: React.FC<MediaListItemProps> = ({ data, activeId, hideImage, showDetails, truncate, onClick }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);

  return (
    <div
      className="flex items-center gap-x-3 p-2 rounded-md"
    >
      <div className={`${hideImage && 'hidden'} relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden`}>
        <Image src={imageUrl || '/images/song-placeholder.png'} className="object-cover" fill alt="Media"/>
        <div className="hidden group-hover:flex justify-center items-center absolute inset-0 bg-black bg-opacity-80 transition duration-300">
          <IoPlaySharp size={25} className="cursor-pointer ml-[2px]" onClick={onClick}/>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center relative">
          <p className={`${activeId === data.id ? 'text-primary' : 'text-white'} truncate`}>
            {truncate ?
              data.title.length > 20 ? data.title.substring(0, 20) + '...' : data.title
              :
              data.title
            }
          </p>
          {activeId === data.id &&
            <Lottie
              animationData={lottie_musicPlaying}
              loop={true}
              className='absolute right-10 -bottom-[2px] w-10 h-10'
            />
          }
        </div>
        <div className="flex">
          <p
            className="text-neutral-400 truncate cursor-pointer hover:underline w-fit"
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/artist/${data.artist_id}`)
            }}
          >
            {data.author}
          </p>
          {showDetails && (
            <p className="text-neutral-400 truncate w-fit">
            • {data?.from_album}
            </p>
          )}
        </div>
      </div>
      <div className="hidden group-hover:flex self-center ml-auto">
        <LikeButton songId={data.id} />
      </div>
    </div>
  )
}

export default MediaListItem
