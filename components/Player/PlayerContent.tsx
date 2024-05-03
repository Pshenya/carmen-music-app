"use client";

import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { useOnIncrementStream, usePlayer } from "@/hooks";
import { Song } from "@/types";
import MediaItem from "../MediaItem";
import LikeButton from "../LikeButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "../Slider";
import PlaybackSlider from "../PlaybackSlider";
import { formatAudioDuration, formatSeekDuration, shuffleArray } from "@/utils/utils";
import PlayerControls from "./PlayerControls";
import useKeydown from "@/hooks/useKeyDown";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  isShuffled: boolean;
  setIsShuffled: (value: boolean) => void;
  isRepeating: boolean;
  setIsRepeating: (value: boolean) => void;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl, isShuffled, setIsShuffled, isRepeating, setIsRepeating }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [originalIds, setOriginalIds] = useState(player.ids);
  const [seek, setSeek] = useState(0);
  const incrementStream = useOnIncrementStream();

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound }] = useSound(
    songUrl,
    {
      volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    }
  );

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      player.setId(player.ids[0]);
      sound?.stop();
      setTimeout(() => {
        incrementStream(player.ids[0]);
      }, 5000); // Increment stream count for the song
      return sound?.play();
    }

    player.setId(prevSong);
  }

  const onPlayNext = () => {
    console.log('player.ids', player.ids);
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    console.log('currentIndex', currentIndex);
    const nextSong = player.ids[currentIndex + 1];
    console.log('nextSong', nextSong);

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
    console.log('player.activeId', player.activeId);
  }

  const onShuffle = () => {
    const currentSongId = player.activeId;

    if (isShuffled) {
      player.setIds(originalIds);
      setOriginalIds([]);
    } else {
      const otherIds = player.ids.filter(id => id !== currentSongId);
      const shuffledIds = shuffleArray(otherIds);
      shuffledIds.unshift(currentSongId);
      player.setIds(shuffledIds);
      setOriginalIds(player.ids);
    }

    setIsShuffled(!isShuffled);
  }

  const onRepeat = () => {
    setIsRepeating(!isRepeating);
  }

  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  useKeydown('Space', handlePlay);

  const handleSeek = (value: number) => {
    if (sound) {
      const positionInSeconds = value * song.duration;
      sound.seek(positionInSeconds);
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    }
  }, [sound, song.title])

  useEffect(() => {
    if (isPlaying && sound) {
      const interval = setInterval(() => {
        setSeek((sound.seek() as number) / song.duration);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, sound, song.duration]);

  useEffect(() => {
    setTimeout(() => {
      incrementStream(song.id);
    }, 5000); // Increment stream count for the song
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song}/>
          <LikeButton songId={song.id}/>
        </div>
      </div>

      <div className="flex flex-col items-center w-full h-auto -mb-[5px]">
        <PlayerControls
          isPlaying={isPlaying}
          isShuffled={isShuffled}
          isRepeating={isRepeating}
          onPlay={handlePlay}
          onPlayNext={onPlayNext}
          onPlayPrevious={onPlayPrevious}
          onShuffle={onShuffle}
          onRepeat={onRepeat}
        />
        <div className="flex items-center gap-x-2 w-[700px]">
          <span className="text-neutral-400 text-xs">{formatSeekDuration(seek, song.duration)}</span>
          <PlaybackSlider value={seek} onChange={(value) => { setSeek(value); handleSeek(value) }}/>
          <span className="text-neutral-400 text-xs">{formatAudioDuration(song.duration)}</span>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">

          <VolumeIcon className="cursor-pointer" size={34} onClick={toggleMute}/>
          <Slider value={volume} onChange={(value) => setVolume(value)}/>
        </div>
      </div>
    </div>
  )
}

export default PlayerContent;