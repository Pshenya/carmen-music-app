"use client";

import { useState } from "react";
import { useDebounce, useGetArtistById, useGetSongsByQuery, useLoadImage, usePlaylistModal, useUser } from "@/hooks";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Header from "@/components/Header";
import { useLoadUserAvatar } from "@/hooks/useLoadImage";
import { Playlist, Song } from "@/types";
import { useRouter } from "next/navigation";
import { CiCirclePlus, CiMusicNote1 } from "react-icons/ci";
import { FaPen, FaPlay } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import PlaylistSearchInput from "./PlaylistSearchInput";
import RecommendList from "@/components/Playlists/RecommendList";
import PlaylistSongList from "@/components/Playlists/PlaylistSongList";
import { BsThreeDots } from "react-icons/bs";
import { formatAudioDuration } from "@/utils/utils";

interface PlaylistPageContentProps {
  playlist: Playlist;
  songs: Song[];
}

const PlaylistPageContent: React.FC<PlaylistPageContentProps> = ({ playlist, songs }) => {
  const router = useRouter();
  const { userDetails } = useUser();
  const { artist } = useGetArtistById(playlist.artist_id);
  const playlistModal = usePlaylistModal();
  const imageUrl = useLoadImage(playlist);
  const userAvatarUrl = useLoadUserAvatar(userDetails!);
  const [searchInput, setSearchInput] = useState('');
  const debouncedValue = useDebounce<string>(searchInput, 500);
  const playlistDuration = formatAudioDuration(songs.reduce((acc, song) => acc + song.duration, 0), true);


  const { songs: searchedSongs, isLoading } = useGetSongsByQuery(debouncedValue);

  const redirect = () => {
    return router.push(`/account`);
  }

  const onUpdatePlaylist = () => {
    playlistModal.setValues(
      playlist.id,
      playlist.name,
      playlist.description || '',
      imageUrl ? imageUrl : '',
      'update',
      artist?.name || '',
    )
    playlistModal.onOpen();
  }

  return (
    <div>
      <Header className="pb-14">
        <div className="md:flex gap-8">
          <div className="flex justify-center items-center gap-4">
            <div className="group relative w-52 md:w-64 h-52 md:h-64 cursor-pointer" onClick={onUpdatePlaylist}>
              <Image
                src={imageUrl || '/images/album-placeholder.png'}
                alt={playlist?.name || 'Album cover'}
                fill
                sizes="100%"
                className="rounded-sm drop-shadow-xl hover:scale-[1.03] transition duration-200"
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition'>
                <FaPen className='text-3xl text-white'/>
                <p className='text-white text-base font-normal pt-2'>Update photo</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-8 justify-end items-center md:items-start mt-4 md:mt-0">
            <div>
              <p className="hidden md:block text-sm">{playlist.is_public ? 'Public ': 'Private '}playlist</p>
              <h1
                className={`font-bold ${playlist?.name?.length! > 20 ? 'text-2xl md:text-7xl' : 'text-4xl md:text-8xl'} cursor-pointer`}
                onClick={onUpdatePlaylist}
              >
                {playlist?.name}
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 font-bold text-white cursor-pointer hover:underline" onClick={redirect}>
                  <Image
                    src={userAvatarUrl || '/icons/spotify.png'}
                    alt={userDetails?.username || 'Username'}
                    width={20}
                    height={20}
                    className="rounded-full h-5"
                    />
                  {userDetails?.username || userDetails?.full_name || 'User'}
                </div>
                {songs.length > 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      <CiMusicNote1 className="text-primary text-[18px]" />
                      <p>{songs.length} songs</p>
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-2">
                      <IoMdTime className="text-primary text-[18px]" />
                      <p>{playlistDuration}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-4 mt-7">
          <div>
            <Button className="flex items-center px-6 py-2 gap-2 text-white/90 hover:scale-110" onClick={() => {}}>
              <FaPlay />
              Play
            </Button>
          </div>
          <div>
            <CiCirclePlus className="text-4xl hover:opacity-70 transition cursor-pointer" />
          </div>
          <div>
            <BsThreeDots className="text-3xl hover:opacity-70 transition cursor-pointer"/>
          </div>
        </div>
      </Header>

      <PlaylistSongList songs={songs} playlistId={playlist.id} showHeadings className="min-h-[150px]"/>
      <div className="bg-black bg-opacity-65 backdrop-blur mt-5 py-5 px-7">
        <div className="border-t border-neutral-500">
          <p className="text-lg md:text-2xl font-bold text-white mt-10 pb-3">Let&apos;s add something your playlist</p>
          <PlaylistSearchInput onSearch={setSearchInput}/>
        </div>
      </div>
      <div className="min-h-[500px]">
        <RecommendList
          songs={searchedSongs}
          isLoading={isLoading}
          playlistId={playlist.id}
          searchInput={searchInput}
        />
      </div>
    </div>
  )
}

export default PlaylistPageContent
