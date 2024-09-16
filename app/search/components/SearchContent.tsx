"use client";

import SongList from "@/components/SongList";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {

  if (songs.length === 0) {
    return (
      <div className="nigga flex flex-col gap-y-2 w-full px-6 text-neutral-400 h-screen bg-black bg-opacity-65 backdrop-blur">
        No songs found
      </div>
    )
  }

  return (
    <SongList songs={songs} showHeadings streamsOrAlbum="album" className="h-full"/>
  )
}

export default SearchContent
