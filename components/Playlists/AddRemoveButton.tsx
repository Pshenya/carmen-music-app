"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser, useAuthModal } from "@/hooks";
import { VscDiffAdded } from "react-icons/vsc";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

interface AddRemoveButtonProps {
  playlistId: string;
  songId: string;
  className?: string;
}

const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({ playlistId, songId, className }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isAdded, setIsAdded] = useState(false);

  const Icon = isAdded ? IoCheckmarkDoneCircle : VscDiffAdded;

  console.log('isAdded', isAdded);

  const handleAddRemoveSong = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!user?.id) {
      return authModal.onOpen();
    }

    if (isAdded) {
      const { error } = await supabaseClient
        .from("playlist_songs")
        .delete()
        .eq("playlist_id", playlistId)
        .eq("user_id", user.id)
        .eq("song_id", songId)

      if (error) {
        toast.error(error.message);
      } else {
        setIsAdded(false);
        toast.success("Removed from playlist!", {duration: 5000});
      }
    } else {
      const { error } = await supabaseClient
        .from("playlist_songs")
        .insert([{ playlist_id: playlistId, user_id: user.id, song_id: songId }])

      if (error) {
        toast.error(error.message);
      } else {
        setIsAdded(true);
        toast.success("Added to playlist!", {duration: 5000});
      }
    }

    router.refresh();
  }

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("playlist_songs")
        .select("*")
        .eq("playlist_id", playlistId)
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsAdded(true);
      }
    }

    fetchData();
  }, [playlistId, songId, user?.id, supabaseClient]);


  return (
    <button className={twMerge('hover:opacity-75 transition', className)} onClick={handleAddRemoveSong}>
      <Icon color={isAdded ? "#FF5D73" : "#fff"} size={24} />
    </button>
  )
}

export default AddRemoveButton
