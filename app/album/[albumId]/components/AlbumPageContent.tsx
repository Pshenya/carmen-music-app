"use client";

import Button from "@/components/ui/Button";
import DiscographyBlock from "@/components/DiscographyBlock";
import Header from "@/components/Header";
import SongList from "@/components/SongList";
import { useGetArtistById, useLoadImage } from "@/hooks";
import { Album, Song } from "@/types";
import { formatAudioDuration } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiCirclePlus, CiMusicNote1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

interface AlbumPageContentProps {
  albumId: string
  album: Album | undefined;
  songs: Song[];
}

const AlbumPageContent: React.FC<AlbumPageContentProps> = ({ albumId, album, songs}) => {
  const router = useRouter();
  const { artist } = useGetArtistById(album?.artist_id!);
  const albumDuration = formatAudioDuration(songs.reduce((acc, song) => acc + song.duration, 0), true);
  const imageUrl = useLoadImage(album!);
  const artistImageUrl = useLoadImage(artist!);

  console.log(imageUrl)


  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(${imageUrl || '/images/album-placeholder.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat'}}
    >
      <Header hideOverlay className="bg-transparent backdrop-blur-0">
        <div className="md:flex gap-8">
          <div className="flex justify-center md:justify-start items-center gap-4">
            <div className="relative">
              <Image
                src={imageUrl || '/images/album-placeholder.png'}
                alt={album?.name || 'Album cover'}
                width={280}
                height={280}
                sizes="100%"
                className="rounded-sm drop-shadow-xl hover:scale-[1.03] transition duration-200"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8 justify-end">
            <div className="flex flex-col md:gap-5 items-center md:items-start mt-2">
              <h1
                className={`font-bold ${album?.name?.length! > 20 ? 'text-3xl md:text-7xl' : 'text-5xl md:text-8xl'}`}
              >
                {album?.name}
              </h1>
              <p className="flex gap-1">{album?.album_type} by
                <span className="font-bold text-primary flex gap-1 cursor-pointer hover:underline" onClick={() => router.push(`/artist/${artist?.id}`)}>
                  {artist?.name}
                  <Image
                    src={artistImageUrl || '/images/artist-placeholder.png'}
                    alt={artist?.name || 'Artist'}
                    width={24}
                    height={24}
                    className="rounded-full h-6"
                  />
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <IoCalendarOutline className="text-primary"/>
                  2023
                </div>
                <span>|</span>
                <div className="flex items-center gap-2">
                  <CiMusicNote1 className="text-primary text-[18px]" />
                  <p>{songs.length} songs</p>
                </div>
                <span>|</span>
                <div className="flex items-center gap-2">
                  <IoMdTime className="text-primary text-[18px]" />
                  <p>{albumDuration}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 -mb-[4px] mt-4 md:mt-0">
                <div>
                  <Button className="flex items-center px-6 py-2 gap-2 hover:scale-110 text-white" onClick={() => {}}>
                    <FaPlay  />
                    Play
                  </Button>
                </div>
                <div>
                  <CiCirclePlus className="text-5xl hover:opacity-70 transition cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>

      <SongList songs={songs} showHeadings hideImage className="bg-transparent backdrop-blur-0"/>

      <DiscographyBlock artistId={album?.artist_id} albumId={albumId} headline="Other releases" className="bg-transparent backdrop-blur-0"/>
    </div>
  )
}

export default AlbumPageContent
