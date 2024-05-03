"use client";

import { useState } from "react";
import { usePlayer } from "@/hooks";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 bg-transparent w-full py-2 h-[90px] px-4">
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
        isShuffled={isShuffled}
        setIsShuffled={setIsShuffled}
        isRepeating={isRepeating}
        setIsRepeating={setIsRepeating}
      />
    </div>
  )
}

export default Player
