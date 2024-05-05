import { useGetSongs, useOnPlay, usePlayer, useRightSidebar } from '@/hooks'
import RightSidebar from './RightSidebar';
import MediaItem from './MediaItem';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import lottie_musicPlaying from '@/public/assets/animations/lottie_musicPlaying.json';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';

const SongsQueueList = () => {
  const { isOpen, onClose } = useRightSidebar();
  const { songs } = useGetSongs();
  const player = usePlayer();
  const { onPlay } = useOnPlay(songs);
  const currentSong = songs.find((song) => song.id === player.activeId);

  const currentSongIndex = player.ids.indexOf(player.activeId!);
  const songsQueueList = songs
    .filter((song) => {
    const songIndex = player.ids.indexOf(song.id);
    return songIndex > currentSongIndex;
  })
  .sort((a, b) => player.ids.indexOf(a.id) - player.ids.indexOf(b.id));

  const [prevSongsQueueListLength, setPrevSongsQueueListLength] = useState(0);

  console.log('currentSong', currentSong);
  console.log('songsQueueList', songsQueueList);


  const handlePlay = (id: string) => {
    return onPlay(id);
  }

  useEffect(() => {
    setPrevSongsQueueListLength(songsQueueList.length);
  }, [songsQueueList]);

  if (!currentSong) {
    return null;
  }

  return (
    <RightSidebar isOpen={isOpen} >
      <div className='flex justify-between px-2'>
        <h1 className='font-bold text-lg'>Queue</h1>
        <IoMdClose onClick={() => onClose()} size={24} className='text-neutral-400 hover:text-white cursor-pointer'/>
      </div>
      <div className='pt-6'>
        <h1 className='font-bold text-lg px-2'>Now playing:</h1>
        <div className='relative'>
        <AnimatePresence>
          {currentSong && (
            <motion.div
              key={currentSong.id}
              initial={{ y: songsQueueList.length > prevSongsQueueListLength ? -100 : 100, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className='absolute w-full'
            >
              <div className='flex rounded-md hover:bg-neutral-400/10 transition'>
                <MediaItem data={currentSong} activeId={player.activeId}/>
                <div>
                  <Lottie
                    animationData={lottie_musicPlaying}
                    loop={true}
                    className='w-10 h-10 mt-1'
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        <div className='pt-6 mt-14'>
          <h1 className='font-bold text-lg px-2'>Next</h1>
          <motion.div
            key={currentSong.id}
            initial={{ y: songsQueueList.length > prevSongsQueueListLength ? -100 : 100, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: songsQueueList.length > prevSongsQueueListLength ? 0 : 1 }}
            transition={{ duration: 0.7 }}
          >
            {songsQueueList.map((song) => (
              <div key={song.id} onClick={() => handlePlay(song.id)} className="rounded-md hover:bg-neutral-400/10 transition">
                <MediaItem data={song} />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </RightSidebar>
  )
}

export default SongsQueueList
