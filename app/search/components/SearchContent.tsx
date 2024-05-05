"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import SongList from "@/components/SongList";
import { useOnPlay } from "@/hooks";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found
      </div>
    )
  }

  return (
    <SongList songs={songs} showHeadings streamsOrAlbum="album"/>
  )
}

export default SearchContent
