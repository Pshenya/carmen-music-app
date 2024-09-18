"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import LikedItem from "@/components/LikedItem";
import ListItem from "@/components/ListItem";
import ScrollContainer from "@/components/ScrollContainer";
import SongItem from "@/components/SongItem";
import TopArtistItem from "@/components/TopArtistItem";
import { useOnPlay } from "@/hooks";
import { Album, Artist, Playlist, Song } from "@/types";
import { shuffleArray } from "@/utils/utils";

interface PageContentProps {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

const PageContent: React.FC<PageContentProps> = ({ songs, artists, albums, playlists }) => {
  const { onPlay } = useOnPlay(songs);
  const topArtists = artists.sort((a, b) => b.listeners - a.listeners);
  const [mixedArray, setMixedArray] = useState<(Artist | Album | Playlist)[]>([]);

  useEffect(() => {
    const newArray = shuffleArray([...artists, ...albums, ...playlists]).slice(0, 7);
    setMixedArray(newArray);
  }, [artists, albums, playlists]);


  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs found
      </div>
    )
  }
  return (
    /**
    |--------------------------------------------------
    | Left and Right side
      Top artists
      Top songs
      Premium banner
      New releases
      Popular playlists
    |--------------------------------------------------
    */
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4 px-6">
        <LikedItem image="/images/liked-songs.png" name="Liked songs" href="liked" className="hover:bg-red-400/10"/>
        {mixedArray.map((item) => (
          <ListItem key={`${item.id}-${item.name}`} data={item} />
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-full md:w-calc-320">
          <div className="relative mb-14">
            <div className="flex justify-between items-center px-6">
              <h1 className="text-white text-3xl font-semibold">
                Made for you
              </h1>
            </div>
            <ScrollContainer playlists={playlists} section="for you"/>
          </div>
          <div className="relative mb-14">
            <div className="flex justify-between items-center px-6">
                <h1 className="text-white text-3xl font-semibold">
                  Best of artists
                </h1>
            </div>
            <ScrollContainer section="artists"/>
          </div>
          <div className="relative mb-14">
            <div className="flex justify-between items-center px-6">
                <h1 className="text-white text-3xl font-semibold">
                  Charts
                </h1>
            </div>
            <ScrollContainer songs={songs} section="song list"/>
          </div>
          <div className="relative mb-14">
            <div className="flex justify-between items-center px-6">
                <h1 className="text-white text-3xl font-semibold">
                  Trending songs
                </h1>
            </div>
            <ScrollContainer playlists={playlists} section="charts"/>
          </div>
          <div className="relative mb-14">
            <div className="flex justify-between items-center px-6">
              <h1 className="text-white text-3xl font-semibold">
                Your latest uploads
              </h1>
            </div>
            <ScrollContainer songs={songs} section="songs"/>
          </div>
        </div>
        <div className='hidden md:flex flex-col gap-1 min-w-[300px] mt-1'>
          <h1 className="text-white font-semibold pl-4 pb-2">
            Top Artists
          </h1>
          {topArtists.slice(0,5).map((artist, index) => (
            <div key={artist.id}>
              <TopArtistItem artist={artist} index={index}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PageContent
