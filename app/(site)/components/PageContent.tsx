"use client";

import SongItem from "@/components/SongItem";
import { useOnPlay } from "@/hooks";
import { Artist, Song } from "@/types";

interface PageContentProps {
  songs: Song[];
  artists: Artist[];
}

const PageContent: React.FC<PageContentProps> = ({ songs, artists }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs found
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={(id: string) => onPlay(id)} />
      ))}
    </div>
  )
}

export default PageContent
