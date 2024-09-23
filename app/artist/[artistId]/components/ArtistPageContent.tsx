"use client";

import AlbumItem from "@/components/AlbumItem";
import ArtistPlaylists from "@/components/ArtistPlaylists";
import Button from "@/components/ui/Button";
import DiscographyBlock from "@/components/DiscographyBlock";
import Header from "@/components/Header";
import SongList from "@/components/SongList";
import { useGetArtistById, useLoadImage, usePlayer } from "@/hooks"
import { Album, Song } from "@/types";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import ArtistBio from "./ArtistBio";

interface ArtistPageContentProps {
  artistId: string;
  songs: Song[];
  albums: Album[];
}

const ArtistPageContent: React.FC<ArtistPageContentProps> = ({ artistId, songs, albums }) => {
  const { artist } = useGetArtistById(artistId);
  const imageUrl = useLoadImage(artist!);
  const player = usePlayer();

  const formattedListeners = new Intl.NumberFormat('en-US').format(artist ? artist.listeners : 0);


  return (
    <div className={`min-h-screen ${player.activeId ? 'mb-[154px] md:mb-[90px]' : 'mb-16 md:mb-0'}`} style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${imageUrl || '/images/artist-placeholder.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat',}}
    >
      <Header className="bg-transparent backdrop-blur-0" hideOverlay>
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
          <p className="md:text-lg ml-1">
            {formattedListeners} monthly listeners
          </p>
          <div className="flex items-center gap-x-4 mt-5">
            <div>
              <Button className="flex items-center px-6 py-2 gap-2 hover:scale-110 text-white" onClick={() => {}}>
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

      <div className="pt-4 px-3">
        <p className="font-bold text-2xl px-6 pb-2">Popular</p>
        <SongList songs={songs} artistPageList className="bg-transparent backdrop-blur-0"/>
      </div>

      <DiscographyBlock artistId={artistId} className="bg-transparent backdrop-blur-0"/>

      <ArtistPlaylists artistId={artistId} />

      <ArtistBio artist={artist!} artistImage={imageUrl!}/>
    </div>
  )
}

export default ArtistPageContent
