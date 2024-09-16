"use client";

import { useRouter } from "next/navigation";
import { Song } from "@/types";
import { useEffect } from "react";
import { useUser } from "@/hooks";
import SongList from "@/components/SongList";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 ">
        No liked songs
      </div>
    )
  }

  return (
    <SongList songs={songs} showHeadings/>
  )
}

export default LikedContent
