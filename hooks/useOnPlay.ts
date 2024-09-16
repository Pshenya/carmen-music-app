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
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      setTimeout(() => {
        player.reset();
        return subscribeModal.onOpen();
      }, 30000);
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return { onPlay, player };
}

export default useOnPlay;