import { useOnPlay } from '@/hooks';
import { Song } from '@/types';
import { twMerge } from 'tailwind-merge';
import MediaItem from '../MediaItem';
import AddRemoveButton from './AddRemoveButton';
import { formatAudioDuration } from '@/utils/utils';
import Lottie from 'lottie-react';
import lottie_loading from '@/public/assets/animations/lottie_loading.json';

interface RecommendListProps {
  songs: Song[];
  isLoading: boolean;
  playlistId: string;
  searchInput: string;
  className?: string;
}

const RecommendList: React.FC<RecommendListProps> = ({ songs, isLoading, playlistId, searchInput, className }) => {
  const { onPlay, player } = useOnPlay(songs);

  const handleOnPlay = (id: string) => {
    if(id) {
      return onPlay(id);
    }

    // Player
  }

  if (searchInput === '') {
    return null;
  }

  else if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full pt-4">
        <Lottie animationData={lottie_loading} loop className='w-20 h-20' />
      </div>
    );
  }

  else if (songs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full pt-10">
        <p className="text-base text-neutral-400">No results found for &quot;{searchInput}&quot;</p>
      </div>
    );
  }

  return (
    <div className={twMerge('flex flex-col gap-y-2 w-full p-6 bg-black bg-opacity-65 backdrop-blur', className)}>
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="group grid grid-cols-2 md:grid-cols-3 gap-4 items-center w-full md:px-7 rounded-md hover:bg-neutral-800/50"
          onClick={() => handleOnPlay(song.id)}
        >
          <MediaItem data={song} activeId={player.activeId}/>
          <div className="hidden md:block text-right text-neutral-400 font-normal">
            {song.from_album}
          </div>
          <div className="flex justify-end gap-x-10 text-neutral-400 pr-10">
            {/* <LikeButton songId={song.id} className='hidden'/> */}
            <AddRemoveButton playlistId={playlistId} songId={song.id}/>
            {/* <div>{formatAudioDuration(song.duration)}</div> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecommendList
