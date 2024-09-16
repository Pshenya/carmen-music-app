"use client";

import { useOnPlay } from '@/hooks'
import { Song } from '@/types'
import { formatAudioDuration } from '@/utils/utils'
import { IoMdTime } from 'react-icons/io'
import Lottie from 'lottie-react';
import lottie_musicPlaying from '@/public/assets/animations/lottie_musicPlaying.json'
import { twMerge } from 'tailwind-merge';
import MediaItem from '../MediaItem';
import AddRemoveButton from './AddRemoveButton';

interface PlaylistSongListProps {
  songs: Song[];
  playlistId: string;
  className?: string;
  showHeadings?: boolean;
  hideImage?: boolean;
  showStreams?: boolean
}

const PlaylistSongList: React.FC<PlaylistSongListProps> = ({ songs, playlistId, className, showHeadings, hideImage, showStreams }) => {
  const { onPlay, player } = useOnPlay(songs);

  const handleOnPlay = (id: string) => {
    if(id) {
      return onPlay(id);
    }

    // Player
  }

  return (
    <div className={twMerge('flex flex-col gap-y-2 w-full p-6 pt-0 bg-black bg-opacity-65 backdrop-blur', className)}>
      {showHeadings && (
        <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full md:px-7 text-neutral-400 border-b border-neutral-500 pb-2">
          <div className="flex items-center gap-1 md:gap-4 text-sm">
            <span>#</span>
            <span className="p-1">Title</span>
          </div>
          <div className="hidden md:block text-right font-normal text-sm">Album</div>
          <div className="flex justify-end gap-x-10 pr-10">
            <span>
              <IoMdTime />
            </span>
          </div>
        </div>
      )}

      {songs.map((song, index) => {
        return (
        <div
          key={song.id}
          className="group grid grid-cols-2 md:grid-cols-3 gap-4 items-center w-full md:px-7 rounded-md hover:bg-neutral-800/50"
          onClick={() => handleOnPlay(song.id)}
          >
          <div className="flex items-center gap-1 md:gap-4">
            {player.activeId === song.id ? (
              <div className='flex'>
                <div className='relative'>
                  <Lottie
                      animationData={lottie_musicPlaying}
                      loop={true}
                      className='absolute transform -translate-x-[35%] -translate-y-[60%] top-1/2 w-10 h-10'
                  />
                </div>
                <div className='opacity-0'>{index + 1}</div>
              </div>
              ) : (
              <div>{index + 1}</div>
            )}
            <MediaItem data={song} activeId={player.activeId} hideImage={hideImage}/>
          </div>
          <div className="hidden md:block text-right text-neutral-400 font-normal">
            {song.from_album}
          </div>
          <div className="relative flex justify-end items-center gap-x-5 text-neutral-400 pr-10">
            <AddRemoveButton songId={song.id} playlistId={playlistId} className='hidden group-hover:block'/>
            <div>{formatAudioDuration(song.duration)}</div>
            {/* <BsThreeDots className='hidden group-hover:block absolute top-[2px] right-0 text-white cursor-pointer' size={20}/> */}
          </div>
        </div>
      )})}
    </div>
  )
}

export default PlaylistSongList;
