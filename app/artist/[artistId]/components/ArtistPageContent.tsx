"use client";

import AlbumItem from "@/components/AlbumItem";
import Button from "@/components/Button";
import DiscographyBlock from "@/components/DiscographyBlock";
import Header from "@/components/Header";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { useGetArtistById, useOnPlay } from "@/hooks"
import { useLoadArtistImage } from "@/hooks/useLoadImage";
import { Album, Song } from "@/types";
import { formatAudioDuration } from "@/utils/utils";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ArtistPageContentProps {
  artistId: string;
  songs: Song[];
  albums: Album[];
}

const ArtistPageContent: React.FC<ArtistPageContentProps> = ({ artistId, songs, albums }) => {
  const { artist } = useGetArtistById(artistId);
  const imageUrl = useLoadArtistImage(artist!);
  const onPlay = useOnPlay(songs);

  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${imageUrl || '/images/artist-placeholder.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat'}}
    >
      <Header className="bg-none">
        <div className="mb-2 flex flex-col gap-1">
          {artist?.verified && (
            <span className="flex gap-1">
              <Image src={'/icons/verified.png'} width={24} height={24} alt="Verified Artist" />
              Verified Artist
            </span>
          )}
          <h1 className="text-5xl md:text-8xl font-bold">
            {artist?.name}
          </h1>
          <div className="flex items-center gap-x-4 mt-5">
            <div>
              <Button className="flex items-center px-6 py-2 gap-2 hover:scale-110" onClick={() => {}}>
                <FaPlay  />
                Play
              </Button>
            </div>
            <div>
              <Button className="px-6 py-2 bg-transparent text-white border border-white">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </Header>
      <div className="flex flex-col gap-y-2 w-full p-6 bg-transparent">
        <p className="font-bold text-2xl px-2">Popular</p>
        {songs.map((song, index) => (
          <div key={song.id} className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center w-full md:px-7 rounded-md hover:bg-neutral-800/50">
            <div className="flex items-center gap-1 md:gap-4">
              <div>{index + 1}</div>
              <MediaItem data={song} onClick={(id: string) => onPlay(id)}/>
            </div>
            <div className="hidden md:block text-right font-normal">{song.streams}</div>
            <div className="flex justify-end gap-x-10">
              <LikeButton songId={song.id} />
              <div>{formatAudioDuration(song.duration)}</div>
            </div>
          </div>
        ))}
      </div>

      <DiscographyBlock artistId={artistId} />
    </div>
  )
}

export default ArtistPageContent
