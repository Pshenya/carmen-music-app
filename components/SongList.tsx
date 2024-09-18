"use client";

import { useOnPlay } from '@/hooks'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import LikeButton from './ui/LikeButton'
import { formatAudioDuration } from '@/utils/utils'
import { IoMdTime } from 'react-icons/io'
import Lottie from 'lottie-react';
import lottie_musicPlaying from '@/public/assets/animations/lottie_musicPlaying.json'
import { twMerge } from 'tailwind-merge';

interface SongListProps {
  songs: Song[];
  className?: string;
  showHeadings?: boolean;
  hideImage?: boolean;
  streamsOrAlbum?: 'streams' | 'album';
  artistPageList?: boolean
}

const SongList: React.FC<SongListProps> = ({ songs, className, showHeadings, hideImage, streamsOrAlbum = 'album', artistPageList }) => {
  const { onPlay, player } = useOnPlay(songs);

  const handleOnPlay = (id: string) => {
    if(id) {
      return onPlay(id);
    }

    // Player
  }

  return (
    <div className={twMerge('flex flex-col gap-y-2 w-full p-6 pt-3 bg-black bg-opacity-65 backdrop-blur', className)}>
      {showHeadings && (
        <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full md:px-7 text-neutral-400 border-b border-neutral-500 pb-2">
          <div className="flex items-center gap-1 md:gap-4 text-sm">
            <span>#</span>
            <span className="p-1">Title</span>
          </div>
          <div className="hidden md:block text-right font-normal text-sm">{streamsOrAlbum === 'streams' ? 'Streams' : 'Album'}</div>
          <div className="flex justify-end gap-x-10">
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
            <MediaItem data={song} activeId={player.activeId} hideImage={hideImage} artistPageList={artistPageList} truncate/>
          </div>
          <div className="hidden md:block text-right text-neutral-400 font-normal">
            {streamsOrAlbum === 'streams' ? song.streams : song.from_album}
          </div>
          <div className="flex justify-end gap-x-10 text-neutral-400">
            <LikeButton songId={song.id} className='hidden'/>
            <div>{formatAudioDuration(song.duration)}</div>
          </div>
        </div>
      )})}
    </div>
  )
}

export default SongList
