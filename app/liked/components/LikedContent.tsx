"use client";

import { useRouter } from "next/navigation";
import { Song } from "@/types";
import { useEffect } from "react";
import { usePlayer, useUser } from "@/hooks";
import SongList from "@/components/SongList";
import { IoMdTime } from "react-icons/io";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const player = usePlayer();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full h-full px-6 pt-3 text-neutral-400 bg-black bg-opacity-65 backdrop-blur">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full md:px-7 text-neutral-400 border-b border-neutral-500 pb-2">
          <div className="flex items-center gap-1 md:gap-4 text-sm">
            <span>#</span>
            <span className="p-1">Title</span>
          </div>
          <div className="hidden md:block text-right font-normal text-sm">Album</div>
          <div className="flex justify-end gap-x-10">
            <span>
              <IoMdTime />
            </span>
          </div>
        </div>
        <h1 className="text-2 mt-5">No liked songs yet...</h1>
      </div>
    )
  }

  return (
    <div className={`${player.activeId ? 'mb-[154px] md:mb-[90px]' : 'mb-16 md:mb-0'}`}>
      <SongList songs={songs} showHeadings/>
    </div>
  )
}

export default LikedContent
