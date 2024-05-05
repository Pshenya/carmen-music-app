import { Song } from "@/types";
import { useAuthModal, usePlayer, useSubscribeModal, useUser } from "."; // @hooks
import { useState } from "react";

const useOnPlay = (songs?: Song[]) => {
  if (!songs) songs = [];
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = async (id: string) => {
    console.log('Playing song with id:', id);
    if (!user) {
      return authModal.onOpen();
    }

    /**
    |--------------------------------------------------
    | Forbid playing songs if user is not subscribed
    |--------------------------------------------------
    */
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return { onPlay, player };
}

export default useOnPlay;